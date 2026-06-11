import Image from "next/image";
import BlueMana from "@/assets/pngegg.png";
import GreenMana from "@/assets/pngegg (1).png";
import BlackMana from "@/assets/pngegg (2).png";
import WhiteMana from "@/assets/pngegg (3).png";
import RedMana from "@/assets/pngegg (4).png";

export default function ManaAnimation() {
    return (
        <div className="w-80 h-80 flex justify-center items-center rounded-full relative orbit
       mx-auto mb-4">
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={BlueMana} alt="Blue Mana" className="w-14 h-14"/>
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={GreenMana} alt="Green Mana" className="w-14 h-14" />
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={BlackMana} alt="Black Mana" className="w-14 h-14" />
    </div>
  </div>
  <div className="orbit-item">
    <div className="orbit-inner">
      <Image src={WhiteMana} alt="White Mana" className="w-14 h-14" />
    </div>
  </div>
  <div className="orbit-item">
    
    <div className="orbit-inner">
      <Image src={RedMana} alt="Red Mana" className="w-14 h-14" />
    </div>
  </div>
</div>

    )
}