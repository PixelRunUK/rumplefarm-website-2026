import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-white">
      {/* Closed box: base layer first, lid composited on top with higher
          z-index. The lid overlaps the box by 70% of its own height so it
          sits seated on the rim (visually tuned). translate is used for the
          offset so `transform` stays free for the GSAP opening animation:
          lifting the lid = animating it up from here, revealing BlackBox. */}
      <div className="relative w-[400px] max-w-[80vw]">
        {/* Ground plane: soft elliptical contact shadow straddling the box
            base (top half hidden behind the box, bottom half visible). Kept
            as its own layer so it can breathe with the lid animation later. */}
        <div
          aria-hidden="true"
          className="absolute bottom-[80px] left-1/2 z-0 h-[308px] w-[130%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_70%)] blur-[8px]"
        />
        <Image
          src="/BlackBox.png"
          alt="Open black box"
          width={861}
          height={959}
          className="relative z-[1] mx-auto block h-auto w-[97%]"
          priority
        />
        <Image
          src="/BlackBoxLid.png"
          alt="Black box lid"
          width={898}
          height={598}
          className="absolute bottom-full left-0 z-10 h-auto w-full translate-y-[87%]"
          priority
        />
      </div>
    </main>
  );
}
