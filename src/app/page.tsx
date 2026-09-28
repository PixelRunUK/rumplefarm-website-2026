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
        <Image
          src="/BlackBox.png"
          alt="Open black box"
          width={861}
          height={959}
          className="mx-auto block h-auto w-[97%]"
          priority
        />
        <Image
          src="/BlackBoxLid.png"
          alt="Black box lid"
          width={898}
          height={598}
          className="absolute bottom-full left-0 z-10 h-auto w-full translate-y-[70%]"
          priority
        />
      </div>
    </main>
  );
}
