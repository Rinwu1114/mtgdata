interface Set {
  id: string;
  code: string;
  icon_svg_uri: string;
  name: string;
  released_at: string;
  set_type: string;
  card_count: number
}

function SetBlock({ set }: { set: Set }) {
  return (
    <div className="bg-gray-800 border border-amber-600 rounded p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-amber-300">{set.code.toUpperCase()}</p>
        <p className="text-sm text-amber-300 capitalize">{set.set_type}</p>
        <p className="text-sm text-amber-300">{set.card_count} cards</p>
      </div>
      <p className="text-gray-400 text-xs mt-1">{new Date(set.released_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  );
}

export function UnreleasedSets({ setGroups }: { setGroups: Set[][] }) {
  
  return (
    <>
      {setGroups.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Upcoming Sets: {setGroups.length}</h2>
          <div className="grid gap-4">
            {setGroups.map((setGroup) => (
              <div
                key={setGroup[0].id}
                className="bg-gray-900 border border-amber-600 rounded-lg p-4 hover:bg-gray-800 transition cursor-pointer opacity-75"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-amber-400">{setGroup[0].name}</h2>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-amber-300">{setGroup[0].code.toUpperCase()}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-amber-300">{setGroup.length} variant{setGroup.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  {setGroup.map((set) => (
                    <SetBlock key={set.id} set={set} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {setGroups.length > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 font-semibold">Released</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>
      )}
    </>
  );
}