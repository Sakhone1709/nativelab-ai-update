import type { Locale } from "@/i18n/routing";

// Inline vectors keep flags visible on systems without emoji flag support.
export function LocaleFlag({locale}:{locale:Locale}) {
  return <svg viewBox="0 0 30 20" width="24" height="16" aria-hidden="true" className="locale-flag">
    {locale==='en'?<><path fill="#183875" d="M0 0h30v20H0z"/><path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20"/><path stroke="#cf233a" strokeWidth="2" d="m0 0 30 20M30 0 0 20"/><path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30"/><path stroke="#cf233a" strokeWidth="4" d="M15 0v20M0 10h30"/></>
    :locale==='th'?<><path fill="#b9263c" d="M0 0h30v20H0z"/><path fill="#fff" d="M0 3h30v14H0z"/><path fill="#243875" d="M0 6h30v8H0z"/></>
    :locale==='lo'?<><path fill="#c52a3c" d="M0 0h30v20H0z"/><path fill="#203f83" d="M0 5h30v10H0z"/><circle cx="15" cy="10" r="4" fill="#fff"/></>
    :<><path fill="#d9232d" d="M0 0h30v20H0z"/>{locale==='vi'?<path fill="#ffdf32" d="m15 3 1.7 5.1h5.4l-4.4 3.2 1.7 5.1-4.4-3.2-4.4 3.2 1.7-5.1-4.4-3.2h5.4z"/>:<g fill="#ffdf32"><path d="m6 2 1 3h3L7.6 7 8.5 10 6 8.1 3.5 10l.9-3L2 5h3z"/>{[[12,2],[15,5],[15,9],[12,12]].map(([x,y])=><path key={y} transform={`translate(${x} ${y}) scale(.3)`} d="m0-4 1 3h3L1.6 1l.9 3L0 2.1-2.5 4l.9-3L-4-1h3z"/>)}</g>}</>}
  </svg>;
}
