import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {
  Map as MapIcon,
  Clock,
  Umbrella,
  Camera,
  SlidersHorizontal,
  X
} from 'lucide-react';
/* -------------  Leaflet ------------- */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* fix bundled marker icons */
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon       from 'leaflet/dist/images/marker-icon.png';
import shadow     from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl:       icon,
  shadowUrl:     shadow
});

/**
 * ------------------------------------------------------------------
 *  InteractiveElement
 *  -----------------------------------------------------------------
 *  A minimal‑dependency, fully‑functional collection of lightweight
 *  interactive cards (map, scroller, timeline, hotspots, CCTV, slider)
 *  that require **no API keys** and work out‑of‑the‑box with Vite.
 * ------------------------------------------------------------------
 */
import 'leaflet/dist/leaflet.css';
interface InteractiveElementProps {
  type: string;
  slug: string; // kept for future routing or analytics
}

/** ---------- Static narrative data & assets (remote, royalty-free) ---------- */
const ASSETS = {
  /* ─── ASSETS.map (replace whole object) ───────────────────────────── */
map: {
  center: [31.65, 35.16] as [number, number], // midpoint between the 3 cities
  zoom: 9,
  pins: [
    {
      label: 'Hebron',
      lat: 31.5326,
      lng: 35.0998,
      diary:
        'Grandfather’s sandal print is long gone, but the dust still tastes of lentils and oaths. I shoulder the same covenant and turn north.'
    },
    {
      label: 'Bethlehem',
      lat: 31.7031,
      lng: 35.1956,
      diary:
        'A shepherd tears warm pita, offers half to a stranger. We break bread; dusk dyes the hills violet. Night-walking begins.'
    },
    {
      label: 'Jerusalem',
      lat: 31.7767,
      lng: 35.2345,
      diary:
        'Olive-leaf wind carries psalms uphill. Then—silver domes, golden stones. Pilgrim heartbeat louder than the shofar I once heard in dreams.'
    }
  ]
},

  /* 2 ▸ SCROLLER — Gandhi Salt March ×6 */
  scroller: {
    background:
      'https://images.unsplash.com/photo-1508779018996-dd07c35e9cbd?auto=format&fit=crop&w=1280&q=80',
    steps: [
      '0 km · Sabarmati — “Let My people go.” (Ex 5:1) — We step off the ashram porch barefoot—liberation never wears shoes.',
      '40 km · Aslali — “The people groaned by reason of bondage.” (Ex 2:23) — Blisters bloom but no one complains; salt will sting worse later.',
      '96 km · Nadiad — “Stand still and see the salvation.” (Ex 14:13) — Railway clerks stare—stillness is another kind of protest.',
      '160 km · Surat — “The sea returned to its strength.” (Ex 14:27) — Arabian waves whisper: empires erode grain by grain.',
      '225 km · Navsari — “You shall tell your child on that day.” (Ex 13:8) — I draft a letter to my unborn grand-daughter: *Remember the walk*.',
      '240 km · Dandi — “Israel saw the great hand.” (Ex 14:31) — He lifts crystalline freedom. I taste Exodus—savory, sharp, unstoppable.'
    ],
      /* existing background + steps … */
  
      /** ── NEW: data for the Leaflet map ───────────── */
      route: {
        center: [22.3, 72.5] as [number, number],   // mid-Gujarat
        zoom: 7,
        stops: [
          { label: 'Sabarmati', lat: 23.0608, lng: 72.5559 },
          { label: 'Aslali',    lat: 22.9080, lng: 72.5850 },
          { label: 'Nadiad',    lat: 22.7000, lng: 72.8700 },
          { label: 'Surat',     lat: 21.1700, lng: 72.8300 },
          { label: 'Navsari',   lat: 20.9500, lng: 72.9000 },
          { label: 'Dandi',     lat: 21.2040, lng: 72.6184 }
        ]
      }
  },

  /* 3 ▸ TIMELINE — 4 civil-rights stops */
  timeline: {
    background: 'https://images.unsplash.com/photo-1520975869011-001d769c4e52?auto=format&fit=crop&w=1280&q=80',
    events: [
      {
        year: 1965,
        date: 'March 7, 1965',
        label: 'Selma March',
        quote: 'Boots on steel; troopers’ gas rolls low. Feet answer dogs with hymns.'
      },
      {
        year: 1968,
        date: 'May 12, 1968',
        label: 'Poor People’s Campaign',
        quote: 'Muddy Resurrection-City tents flap like Torah scrolls—justice is weather-proof.'
      },
      {
        year: 1991,
        date: 'August 19, 1991',
        label: 'Crown Heights',
        quote: 'Sirens braid with Shabbat songs; asphalt remembers both wounds and weddings.'
      },
      {
        year: 2020,
        date: 'May 30, 2020',
        label: 'George Floyd / NYC',
        quote: 'Knee-pressed pavement shouts worldwide. Millions march—echo becomes earthquake.'
      }
    ]
  
  },

  /* 4 ▸ HOTSPOTS — Paris umbrellas */
  hotspots: {
    background:
      'https://www.arteet.com/photo/painting-old-paris-333487.jpg',
    spots: [
      {
        x: '28%',
        y: '44%',
        text: 'Rue des Rosiers, 1895 — Pickle barrels outside No. 17; Yiddish jokes mist the February air.',
        img: 'https://www.inalco.fr/sites/default/files/styles/3x2_sm/public/assets/images/rue_des_hospitalieres_en-tete_article.jpg?h=b42459af&itok=xhoIBX7j'
      },
      {
        x: '56%',
        y: '39%',
        text: 'Vel d’Hiv Protest, 1934 — Shouts bounce off umbrellas; some carry banners, others carry silence.',
        img: 'https://www.rosalux.de/fileadmin/_processed_/0/7/csm_Demonstrationxx_4ad023d4a8.jpg'
      },
      {
        x: '38%',
        y: '63%',
        text: 'Butcher’s Alley, 1922 — Blood washes down Rue des Écouffes—kosher and not. I tuck my apron under my coat.',
        img: 'https://m.media-amazon.com/images/I/51Enf+0LtKL._AC_UF894,1000_QL80_.jpg'
      },
      {
        x: '49%',
        y: '41%',
        text: 'St. Paul Métro Stop, 1939 — We packed one suitcase. Mama packed another, just in her mind.',
        img: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2009/2/17/1234835439011/Jews-arriving-at-Pithivie-003.jpg?width=465&dpr=1&s=none&crop=none'
      },
      {
        x: '62%',
        y: '58%',
        text: 'Café Crémieux, 1928 — Black coffee, white sugar, Ladino murmurs beside accordion music. France in stereo.',
        img: 'https://c8.alamy.com/comp/2T1JRTG/meeting-of-jewish-leaders-in-the-streets-of-le-marais-paris-france-2T1JRTG.jpg'
      },
      {
        x: '70%',
        y: '35%',
        text: 'Rue Pavée Synagogue, 1941 — They post the yellow-star law on the synagogue door. My umbrella trembles.',
        img: 'https://destinees-juives.expositionsvirtuelles.fr/files/derivatives/small/bordeaux-2-1.jpg'
      }
    ]
  },

  /* 5 ▸ CCTV — (video now local mp4 file) */
  cctv: {
    video: '/5582584-uhd_3840_2160_24fps.mp4'
  },

  /* 6 ▸ SLIDER — before / after labels */
  slider: {
    before:
      'https://upload.wikimedia.org/wikipedia/commons/1/17/Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg',
    after:
      'https://upload.wikimedia.org/wikipedia/commons/f/f2/1802_Chez_Jean_Map_of_Paris_in_12_Municipalities%2C_France_-_Geographicus_-_Paris-jean-1802.jpg',
    labelBefore: "1877 — Caillebotte’s Rainy Day: polished boulevards and umbrellas.",
    labelAfter:  "1802 — Pre-Haussmann map of Paris’s medieval Jewish quarter."
  }
};

/** ---------- Helper Components ---------- */
const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case 'map':
    case 'scroller':
      return <MapIcon size={32} />;
    case 'timeline':
      return <Clock size={32} />;
    case 'hotspots':
      return <Umbrella size={32} />;
    case 'cctv':
      return <Camera size={32} />;
    case 'slider':
      return <SlidersHorizontal size={32} />;
    default:
      return null;
  }
};

/** ---------- Main Component ---------- */
const InteractiveElement: React.FC<InteractiveElementProps> = ({
  type,
  slug
}) => {
 /** MAP --------------------------------------------------------------- */
const renderMap = () => {
  const { center, zoom, pins } = ASSETS.map;

  return (
    <section className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]">
      <header className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Aliyah Journey</h3>
        <Icon type="map" />
      </header>

      {/* LIVE MAP */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '20rem', width: '100%', borderRadius: '0.5rem' }}
        className="leaflet-container"
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pins.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              <strong>{p.label}</strong>
              <br />
              {p.diary}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <p className="mt-4 text-sm text-gray-600">
        Click pins to read diary fragments. Scroll to zoom / drag to pan.
      </p>
    </section>
  );
};

  /** SCROLLER ----------------------------------------------------------- */
  const renderScroller = () => {
    const { steps, background } = ASSETS.scroller;
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!scrollerRef.current) return;
      const io = new IntersectionObserver(
        entries =>
          entries.forEach(e =>
            e.isIntersecting
              ? (e.target as HTMLElement).classList.add('opacity-100', 'translate-y-0')
              : undefined
          ),
        { root: scrollerRef.current, threshold: 0.6 }
      );
      scrollerRef.current
        .querySelectorAll('.scroll-animate')
        .forEach(el => io.observe(el));
      return () => io.disconnect();
    }, []);

    return (
      <section className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]">
        {/* header */}
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Salt Pilgrimage</h3>
          <Icon type="scroller" />
        </header>

        {/* vertical text scroller */}
        <div
          ref={scrollerRef}
          className="h-72 overflow-y-auto pr-3 rounded bg-gradient-to-b from-white/70 to-[#f6f0e6]"
          style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >       
          {steps.map((txt, i) => (
            <div
            key={i}
            className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 py-6 px-4 my-2 rounded bg-white/80 shadow-md backdrop-blur-sm"
          >
            <p className="text-[#1c2340] drop-shadow font-medium text-sm leading-relaxed">{txt}</p>
          </div>
          ))}
        </div>

        {/* Leaflet map below the scroller */}
        <div className="mt-6">
          <MapContainer
            center={ASSETS.scroller.route.center}
            zoom={ASSETS.scroller.route.zoom}
            scrollWheelZoom={false}
            style={{ height: '16rem', width: '100%', borderRadius: '0.5rem' }}
          >
            <TileLayer
              attribution='© OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* red route line */}
            <Polyline
              positions={ASSETS.scroller.route.stops.map(s => [s.lat, s.lng])}
              pathOptions={{ color: '#d9564d', weight: 4 }}
            />

            {/* pins */}
            {ASSETS.scroller.route.stops.map((s, i) => (
              <Marker key={i} position={[s.lat, s.lng]}>
                <Popup>{s.label}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Scroll the diary, then zoom-drag the map to trace Gandhi’s 240-mile path.
        </p>
      </section>
    );
    
  };

  // Scroll reveal effect
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-animate');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.remove(
              'opacity-0',
              'translate-y-8'
            );
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /** TIMELINE ----------------------------------------------------------- */
  const Timeline: React.FC = () => {
    const { events } = ASSETS.timeline;
    const [idx, setIdx] = useState(0);

    return (
      <section
        className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]"
        style={{ backgroundImage: `url(${ASSETS.timeline.background})` }}
      >
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Civil Rights Timeline</h3>
          <Icon type="timeline" />
        </header>

        <div className="h-80 bg-[#e5dfd5] rounded relative flex flex-col justify-center items-center">
          <div className="w-[90%] h-1 bg-[#cba95b] relative">
            {/* ticks */}
            {events.map((e, i) => (
              <div
                key={i}
                className="absolute w-1 h-4 bg-[#cba95b] -translate-x-1/2"
                style={{ left: `${(i / (events.length - 1)) * 100}%` }}
              ></div>
            ))}

            {/* draggable knob */}
            <input
              type="range"
              min={0}
              max={events.length - 1}
              value={idx}
              onChange={e => setIdx(Number(e.target.value))}
              className="absolute -top-2 w-full h-6 opacity-0 cursor-ew-resize"
            />
            <div
              className="absolute w-4 h-4 bg-[#d9564d] rounded-full border-2 border-white -translate-x-1/2"
              style={{ left: `${(idx / (events.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Current event box */}
          <div className="mt-4 bg-white bg-opacity-80 p-4 rounded shadow text-center">
            <p className="text-sm italic font-medium">{events[idx].label}</p>
            <p className="text-xs text-gray-700 mb-2">{events[idx].date}</p>
            <p>“{events[idx].quote}”</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Drag the knob or use the buttons to explore moments.
        </p>
      </section>
    );
  };

  /** HOTSPOTS ----------------------------------------------------------- */
  const Hotspots: React.FC = () => {
    const { background, spots } = ASSETS.hotspots;
    const [active, setActive] = useState<number | null>(null);

    return (
      <section className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Paris Umbrellas</h3>
          <Icon type="hotspots" />
        </header>

        <div
          className="relative h-80 bg-cover bg-center rounded overflow-hidden"
          style={{ backgroundImage: `url(${background})` }}
        >
          {spots.map((s, i) => (
            <button
              key={i}
              style={{ left: s.x, top: s.y }}
              onClick={() => setActive(i)}
              className="absolute w-8 h-8 rounded-full bg-[#cba95b] bg-opacity-60 hover:bg-opacity-90
                         -translate-x-1/2 -translate-y-1/2"
            >
              <span className="block w-full h-full rounded-full border-2 border-white animate-ping opacity-50"></span>
            </button>
          ))}

          {/* modal */}
          {active !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white rounded p-4 max-w-sm relative">
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <img
                  src={spots[active].img}
                  alt={spots[active].text}
                  className="rounded mb-2 max-h-52 object-cover"
                />
                <p className="text-sm">{spots[active].text}</p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Click umbrellas to reveal archival photos.
        </p>
      </section>
    );
  };

  /** CCTV --------------------------------------------------------------- */
  const CCTV: React.FC = () => {
    const { video } = ASSETS.cctv;
    // ─── toggle between prerecorded CCTV feed and user's front camera ──
    const [useCamera, setUseCamera] = useState(false);
    const camRef = useRef<HTMLVideoElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
      if (!useCamera) return;

      let stream: MediaStream;

      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'user' } })
        .then(s => {
          stream = s;
          if (camRef.current) camRef.current.srcObject = s;
        })
        .catch(err => {
          console.error('Camera access denied', err);
          setUseCamera(false);          // graceful fallback
        });

      return () => {
        stream?.getTracks().forEach(t => t.stop());
      };
    }, [useCamera]);
    // restart the looped video each time we leave camera mode
    useEffect(() => {
      if (useCamera) return;                // only run when switching *to* video
      const vid = videoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => {/* ignore browser autoplay blocks */});
      }
    }, [useCamera]);

    return (
      <section className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Surveillance View</h3>
          <Icon type="cctv" />
        </header>

        <div className="relative h-80 rounded overflow-hidden bg-black">
          {/* live / prerecorded feed */}
          {useCamera ? (
            <video
              ref={camRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* overlay HUD */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-30 flex flex-col pointer-events-none select-none">
            <div className="bg-black bg-opacity-50 p-2 text-white text-xs flex justify-between">
              <span>CAM‑03</span>
              <span>LIVE</span>
            </div>
            <div className="flex-grow"></div>
            <div className="p-2 text-white text-xs bg-black bg-opacity-50 self-end mr-2 mb-2 rounded">
              REC
            </div>
          </div>

          {/* revert toggle */}
          <button
            onClick={() => setUseCamera(prev => !prev)}
            className="absolute bottom-3 left-3 bg-white bg-opacity-80 px-2 py-1 rounded text-xs z-10"
          >
            {useCamera ? 'Exit' : 'Revert'}
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Embedded CCTV overlay.
        </p>
      </section>
    );
  };

  /** SLIDER (before / after) ------------------------------------------- */
  const Slider: React.FC = () => {
    const { before, after } = ASSETS.slider;
    const [divider, setDivider] = useState(50);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const startDrag = (
      e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
    ) => {
      e.preventDefault();
      const move = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setDivider(pct);
      };

      const onMove = (ev: MouseEvent | TouchEvent) => {
        const clientX =
          'touches' in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
        move(clientX);
      };

      const onUp = () => {
        window.removeEventListener('mousemove', onMove as any);
        window.removeEventListener('touchmove', onMove as any);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);
      };

      window.addEventListener('mousemove', onMove as any);
      window.addEventListener('touchmove', onMove as any);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    };

    return (
      <section className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]">
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Caillebotte's Paris</h3>
          <Icon type="slider" />
        </header>

        <div
          ref={containerRef}
          className="relative h-80 rounded overflow-hidden select-none"
        >
          {/* after image */}
          <img
            src={after}
            alt="Modified"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* before image, clipped */}
          <img
            src={before}
            alt="Original"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${divider}%` }}
          />

          {/* divider bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize"
            style={{ left: `${divider}%` }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            {/* knob */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full shadow
                            -translate-y-1/2 flex items-center justify-center">
              <Umbrella size={16} className="text-[#1c2340]" />
            </div>
          </div>

          {/* labels */}
          <span className="absolute bottom-3 left-3 bg-white bg-opacity-80 px-2 py-1 rounded text-sm">
            Original
          </span>
          <span className="absolute bottom-3 right-3 bg-white bg-opacity-80 px-2 py-1 rounded text-sm">
            Modified
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Drag the handle to compare images.
        </p>
      </section>
    );
  };

  /** DEFAULT ------------------------------------------------------------ */
  const renderFallback = () => (
    <section className="bg-[#f6f0e6] p-6 rounded-lg border border-[#cba95b]">
      <p>Interactive element for <strong>{slug}</strong> coming soon.</p>
    </section>
  );

  /** SWITCH ------------------------------------------------------------- */
  const getContent = () => {
    switch (type) {
      case 'map':
        return renderMap();
      case 'scroller':
        return renderScroller();
      case 'timeline':
        return <Timeline />;
      case 'hotspots':
        return <Hotspots />;
      case 'cctv':
        return <CCTV />;
      case 'slider':
        return <Slider />;
      default:
        return renderFallback();
    }
  };

  return <div className="my-8">{getContent()}</div>;
};

export default InteractiveElement;