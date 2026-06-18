import { ReleasedSets } from './released';
import { UnreleasedSets } from './unreleased';

interface Set {
  id: string;
  code: string;
  name: string;
  released_at: string;
  set_type: string;
  card_count: number;
  parent_set_code?: string;
  set_parent?: string | null;
}

// Group sets by parent_set_code: main sets (no parent) + their children
function groupSetsByParent(setList: Set[]) {
  // Create a map for quick lookup by code
  const setsByCode = new Map<string, Set>();
  setList.forEach(set => setsByCode.set(set.code, set));

  // Find main sets (no parent)
  const mainSets = setList.filter(set => !set.parent_set_code);

  // Group sets: main set + all children
  const grouped: Set[][] = mainSets.map(mainSet => {
    const group = [mainSet];
    
    // Find all sets whose parent is this main set
    const children = setList.filter(set => set.parent_set_code === mainSet.code);
    
    // Sort children by set_type (expansion first)
    children.sort((a, b) => {
      const aIsExpansion = a.set_type === 'expansion' ? 0 : 1;
      const bIsExpansion = b.set_type === 'expansion' ? 0 : 1;
      return aIsExpansion - bIsExpansion;
    });
    
    group.push(...children);
    return group;
  });

  console.log('Set parent grouping:', grouped.length, 'groups created');
  return grouped;
}

export default async function Sets() {
  const defaultHeaders = {
    "User-Agent": `Mtg-Database/1.0 (Contact: rinwu1114@gmail.com)`,
    Accept: `application/json`,
  };
  
  let releasedGroups: Set[][] = [];
  let unreleasedGroups: Set[][] = [];
  let error: string | null = null;

  try {
    const response = await fetch('https://api.scryfall.com/sets', {
      method: 'GET',
      headers: defaultHeaders,
      next: { revalidate: 86400 } // ISR: revalidate every 24 hours
    });
    
    if (!response.ok) {
      throw new Error(`Scryfall API responded with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate API response structure
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid API response: expected data.data to be an array');
    }
    
    // Filter for sets with release dates and sort by release date
    const allSets = data.data
      .filter((set: Set) => set.released_at)
      .sort((a: Set, b: Set) => new Date(b.released_at).getTime() - new Date(a.released_at).getTime());

    console.log('Sets with release dates:', allSets.length);
    console.log('Sample sets:', allSets.slice(0, 3));

    if (allSets.length === 0) {
      throw new Error('No sets with release dates found in API response');
    }

    // Separate released and unreleased sets
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const allReleased = allSets.filter((set: Set) => {
      try {
        return new Date(set.released_at) <= today;
      } catch {
        console.warn(`Invalid date format for set "${set.name}": ${set.released_at}`);
        return false;
      }
    });
    
    const allUnreleased = allSets.filter((set: Set) => {
      try {
        return new Date(set.released_at) > today;
      } catch {
        return false;
      }
    });

    console.log('Released sets:', allReleased.length);
    console.log('Unreleased sets:', allUnreleased.length);

    releasedGroups = groupSetsByParent(allReleased);
    unreleasedGroups = groupSetsByParent(allUnreleased);
    
    console.log('Released set groups:', releasedGroups.length);
    console.log('Unreleased set groups:', unreleasedGroups.length);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred';
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">MTG Sets</h1>
          
          <div className="bg-red-900 border border-red-600 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-200 mb-3">Error Loading Sets</h2>
            <p className="text-red-100 mb-2">{error}</p>
            <p className="text-red-300 text-sm">
              Please try refreshing the page or contact support if the problem persists.
            </p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Magic: The Gathering Sets</h1>
        
        <div className="space-y-8">
          <UnreleasedSets setGroups={unreleasedGroups} />
          <ReleasedSets setGroups={releasedGroups} />
        </div>
      </div>
    </main>
  );
}