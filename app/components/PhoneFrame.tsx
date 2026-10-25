import Image from "next/image";

/**
 * A slim, near-black phone body around a portrait screenshot, modelled on the original site's device frame.
 * Width comes from the caller; height follows the 9:20 screen. Put it inside a `group` to get the hover zoom and glare.
 */
export default function PhoneFrame({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/20] rounded-[15%/6.8%] bg-[#0b0b0f] p-[2.6%] shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_25px_60px_-20px_rgba(0,0,0,0.9)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_30px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12.5%/5.6%] bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Soft glass glare that slides across on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.10)_50%,transparent_65%)] transition-transform duration-1000 ease-out group-hover:translate-x-full"
        />
        {/* A small camera dot, not a full notch, so it never covers the app's own status bar. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.3%] h-[1.9%] w-[4.2%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
        />
      </div>
      <span aria-hidden="true" className="absolute -right-[1.6%] top-[24%] h-[10%] w-[1.6%] rounded-r-sm bg-[#1a1a20]" />
      <span aria-hidden="true" className="absolute -left-[1.6%] top-[19%] h-[5%] w-[1.6%] rounded-l-sm bg-[#1a1a20]" />
      <span aria-hidden="true" className="absolute -left-[1.6%] top-[27%] h-[9%] w-[1.6%] rounded-l-sm bg-[#1a1a20]" />
    </div>
  );
}
