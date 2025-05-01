import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cards } from '../data/cards';
import InteractiveElement from '../components/InteractiveElements';
import VirtualWalk from '../components/VirtualWalk';
import Citation from '../components/Citation';
import { ChevronLeft, ChevronRight, BookOpen, Map, ScrollText, ChevronDown } from 'lucide-react';

const CardPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showMakingOf, setShowMakingOf] = useState(true);
  
  const card = cards.find(c => c.slug === slug);
  const cardIndex = cards.findIndex(c => c.slug === slug);
  const prevCard = cardIndex > 0 ? cards[cardIndex - 1] : cards[cards.length - 1];
  const nextCard = cardIndex < cards.length - 1 ? cards[cardIndex + 1] : cards[0];
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
    return () => {
      // Cleanup function to reset state when component unmounts
      setIsLoading(false);
    };
  }, [slug]);
  
  const handleNavigation = (newSlug: string) => {
    setIsLoading(true);
    // Use navigate instead of Link to have more control over the transition
    navigate(`/card/${newSlug}`);
  };
  
  const renderInteractiveElement = () => {
    if (!card) return null;
    if (card.slug === 'shabbat') {
      return <InteractiveElement type="shabbat" slug={card.slug}/>;
    }
    if (card.slug === 'letters') {
      return <InteractiveElement type="letters" slug={card.slug} />;
    }
    return <InteractiveElement type={card.interactiveType} slug={card.slug} />;
  };
  
  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Card not found</h2>
          <Link to="/" className="text-[#cba95b] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f0e6]">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cba95b]"></div>
        </div>
      )}
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 0 - Sticky sidebar */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Anchor Source</h3>
                <div className="aspect-video rounded-md overflow-hidden mb-2">
                  <img
                    src={card.visualHook}
                    alt={card.visualDescription || card.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x225?text=Image+Not+Available';
                    }}
                  />
                </div>

                {card.visualDescription && (
                  <p className="text-xs italic text-gray-600 mb-4">
                    {card.visualDescription}
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  The journey explores connections between {card.title.toLowerCase()} and Jewish walking traditions.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Course Tie-In</h3>
                <p className="text-sm text-gray-600">
                  {card.slug === 'aliyah' && (
                    <>Week Two – Jan 27 "Homo Viator: Pilgrims and Pilgrimages"<br />
                    That class foregrounds ritual foot-journeys—from medieval Camino routes to Solnit's chapter on pilgrimage—framing walking as a sacred ascent. The Aliyah card mirrors the syllabus by treating the uphill trek to Jerusalem as theology in motion, exactly the kind of "pilgrimage logic" the week asks us to analyze.</>
                  )}
                  {card.slug === 'salt' && (
                    <>Week Five – Feb 20 "On the March" (Student-led Class 4)<br />
                    Week Five dissects political marching—Gandhi's Salt March is the headline example—showing how collective feet can topple empires. The card retells that very protest and layers on Solnit, Debord, and de Certeau, so it plugs straight into the syllabus's revolution-on-foot conversation.</>
                  )}
                  {card.slug === 'birmingham' && (
                    <>Week Five – Feb 20 "On the March"<br />
                    The same session pairs Gandhi with Dr. King and Rabbi Heschel; King's Letter from Birmingham Jail is required reading. Your card follows the syllabus script: justice pursued by walking rails and roads, legs that "pray," and Exodus resonances—exactly what the week's discussion of civil-rights marches covers.</>
                  )}
                  {card.slug === 'paris' && (
                    <>Week Ten – Apr 1 "The Aesthetics of Urban Walking: The Flâneur"<br />
                    Week Ten centers on Baudelaire's flâneur, Benjamin, and Solnit's "Walking in Paris." The card zooms in on Rue des Rosiers, antisemitism, and the flâneur's conditional anonymity—perfect for the syllabus theme of strolling as social x-ray.</>
                  )}
                  {card.slug === 'rainyday' && (
                    <>Week Nine – Mar 27 "The 'Nature' of Urban Walking"<br />
                    That lecture looks at Haussmannization, Caillebotte's Paris Street, Rainy Day, and de Certeau's notion of pedestrians "tactically" inscribing space. Your card literally centers on Caillebotte's canvas and Jewish footprints muddying Haussmann's boulevards—case-study material for Week Nine.</>
                  )}
                  {card.slug === 'poe' && (
                    <>Week Eleven – Apr 17 "Surveillance, Mystery, Detection & Discovery"<br />
                    The Poe story "The Man of the Crowd" anchors this class, which spirals into CCTV, gait biometrics, and Calle/Acconci stalking pieces. Your card updates Poe with modern surveillance tech, matching the week's exploration of who watches whom on the street.</>
                  )}
                  {card.slug === 'shabbat' && (
                    <>Week Four – Feb 11 "The Romantic Walker is Born"<br />
                    Week Four weighs walking as contemplative ritual—Rousseau's Reveries, Solnit's "Mind at Three Miles an Hour," Ammons's "A Poem is a Walk." The Shabbat card's stillness-in-motion, weekly repetition, and embodied meditation echo that introspective tradition the week spotlights.</>
                  )}
                  {card.slug === 'letters' && (
                    <>Week Thirteen – April 22 "The Documented Walk"<br />
                    This week explored how recording—through photography, video, text, or sound—alters a walk's meaning. We pair Long's grass incision, Nauman's perimeter performance, and Cardiff's riverside hair installation with Solnit's Las Vegas dérive to ask: does documentation deepen the journey or derail it?</>
                  )}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Theory Links</h3>
                <div className="space-y-3">
                  {card.slug === 'aliyah' && (
                    <>
                      <Link to="/theory#exile" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Solnit: Walking & Exile</span>
                      </Link>
                      <Link to="/theory#psychogeography" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <Map size={16} className="mr-2" />
                        <span>Debord: Psychogeography</span>
                      </Link>
                      <Link to="/theory#tactics" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <ScrollText size={16} className="mr-2" />
                        <span>de Certeau: Tactics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'salt' && (
                    <>
                      <Link to="/theory#exile" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Solnit: Walking & Exile</span>
                      </Link>
                      <Link to="/theory#psychogeography" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <Map size={16} className="mr-2" />
                        <span>Debord: Psychogeography</span>
                      </Link>
                      <Link to="/theory#tactics" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <ScrollText size={16} className="mr-2" />
                        <span>de Certeau: Tactics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'birmingham' && (
                    <>
                      <Link to="/theory#psychogeography" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <Map size={16} className="mr-2" />
                        <span>Debord: Psychogeography</span>
                      </Link>
                      <Link to="/theory#tactics" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <ScrollText size={16} className="mr-2" />
                        <span>de Certeau: Tactics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'paris' && (
                    <>
                      <Link to="/theory#psychogeography" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <Map size={16} className="mr-2" />
                        <span>Debord: Psychogeography</span>
                      </Link>
                      <Link to="/theory#tactics" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <ScrollText size={16} className="mr-2" />
                        <span>de Certeau: Tactics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'rainyday' && (
                    <>
                      <Link to="/theory#psychogeography" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <Map size={16} className="mr-2" />
                        <span>Debord: Psychogeography</span>
                      </Link>
                      <Link to="/theory#tactics" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <ScrollText size={16} className="mr-2" />
                        <span>de Certeau: Tactics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'poe' && (
                    <>
                      <Link to="/theory#tactics" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <ScrollText size={16} className="mr-2" />
                        <span>de Certeau: Tactics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'shabbat' && (
                    <>
                      <Link to="/theory#exile" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Solnit: Walking & Exile</span>
                      </Link>
                      <Link to="/theory#rousseau" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Rousseau: Walker's Paradox</span>
                      </Link>
                      <Link to="/theory#ammons" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Ammons: Poem-Walk Poetics</span>
                      </Link>
                    </>
                  )}
                  {card.slug === 'letters' && (
                    <>
                      <Link to="/theory#solnit-vegas" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Solnit: Las Vegas walk</span>
                      </Link>
                      <Link to="/theory#certeau-sidewalk" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>de Certeau: "Walking in the City"</span>
                      </Link>
                      <Link to="/theory#debord-compass" className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors">
                        <BookOpen size={16} className="mr-2" />
                        <span>Debord: Psychogeography & dérive</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 1 - Main content */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-2">{card.emoji}</span>
                <h2 className="text-3xl font-bold">{card.title}</h2>
              </div>
              
              <div 
                className="prose max-w-none mb-8"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p className="text-xl leading-relaxed whitespace-pre-line">{card.diaryText}</p>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-[#cba95b]"></div>
              </div>
              
              <div 
                className="prose max-w-none mb-8"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <p className="text-base text-gray-700 italic">
                  The psychogeography of this space reveals hidden connections between physical movement and cultural memory. 
                  As Debord suggests <Citation sourceId="debord" />, the emotional contours of a space can be mapped through intentional wandering.
                </p>
              </div>
              
              <div 
                data-aos="fade-up"
                data-aos-delay="600"
              >
                {renderInteractiveElement()}
              </div>
              
              <div className="flex justify-between items-center mt-12">
                <button 
                  onClick={() => handleNavigation(prevCard.slug)}
                  className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors"
                  disabled={isLoading}
                >
                  <ChevronLeft size={20} className="mr-1" />
                  <span>Previous: {prevCard.title}</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation(nextCard.slug)}
                  className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors"
                  disabled={isLoading}
                >
                  <span>Next: {nextCard.title}</span>
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Column 2 - Sticky sidebar */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={card.visualHook} 
                    alt={card.visualDescription || `Visual representation of ${card.title}`}
                    className="w-full h-full object-cover transition-opacity duration-1000"
                    data-aos="fade-in"
                    data-aos-duration="1500"
                  />
                </div>
                
                <div className="p-4">
                  <button 
                    onClick={() => setShowMakingOf(!showMakingOf)}
                    className="text-sm text-[#1c2340] hover:text-[#cba95b] transition-colors flex items-center"
                  >
                    {showMakingOf ? "Hide Making-Of" : "Show Making-Of"}
                    <ChevronDown size={16} className={`ml-1 transform transition-transform ${showMakingOf ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showMakingOf && (
                    <div className="mt-4 space-y-4">
                      {card.slug === 'aliyah' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Aliyah, Not Allegory</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I wanted the reader to feel an uphill Jerusalem
                            pilgrimage through three time layers at once—Second‑Temple caravans,
                            medieval scholars like Kalonymus ben Kalonymus, and today's backpackers.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Torah commands for the
                            thrice‑yearly festivals (Ex 23 &amp; Dt 16) and Psalms 120‑134, the
                            "Songs of Ascents" historically sung while climbing.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> Rebecca Solnit's idea of a pilgrimage
                            drawing an invisible "sacred map," Guy Debord's <em>dérive</em> (here
                            tilted upward instead of sideways), and Michel de Certeau's claim that
                            walkers "write texts they cannot read."
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The interactive map layers elevation data
                            onto ancient caravan routes; the warm photo glow echoes Jerusalem's
                            nickname "City of Gold."
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take‑away:</strong> By merging calf‑ache with covenant memory,
                            the card shows how physical ascent welds diaspora identity back to
                            stone and sky.
                          </p>
                        </>
                      )}
                      {card.slug === 'salt' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Salt of the Covenant</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I wanted to connect the embodied protest of Gandhi's Salt March with the ritual salt on the Passover table, foregrounding how small grains can catalyze sweeping change.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Gandhi's own Salt March journals, Leviticus 2:13's "salt of the covenant," and Exodus 12–14's liberation narrative.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> Rebecca Solnit's idea of protest as punctuation in history, de Certeau's "tactics" versus "strategy," and Debord's ambiance shift in revolutionary spaces.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The interactive scroller follows the Dandi shoreline, with granular salt overlays echoing both the march and the Seder's tactile rituals.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The card highlights how tasting salt at Passover is not just memory, but an act of resistance, linking Jewish ritual to global movements for justice.
                          </p>
                        </>
                      )}
                      {card.slug === 'birmingham' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Letters on the Road</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I wanted to trace the footsteps from King's Birmingham Jail letter through Selma to contemporary protests, showing how the act of walking becomes a moral argument.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Dr. King's "Letter from Birmingham Jail," Deuteronomy 16:20 ("Justice, justice shall you pursue") and Amos 5:24's call for justice to "roll down like waters."
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> Thoreau's "Civil Disobedience," Solnit's walking as witness, and de Certeau and Debord's concepts of moral mapping in urban space.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The slider traces a timeline from Selma to Black Lives Matter, overlaying protest marches with biblical justice language.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The card reframes Jewish pursuit of justice (<em>tirdof</em>) as an embodied, ongoing walk, linking ancient commandments to modern activism.
                          </p>
                        </>
                      )}
                      {card.slug === 'paris' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Bath of Multitudes</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I aimed to immerse the reader in the layered Jewish life of Paris's Marais, from Dreyfus to the present, revealing how walking the same streets can mean safety or peril depending on the era.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Newspaper coverage of the Dreyfus Affair, Vel d'Hiv roundup testimonies, and Rue des Rosiers walking guides.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> de Certeau's "pedestrian guerrilla" and Debord's "Naked City" maps, showing how urban walking can resist or reveal power.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> Interactive hotspots let users explore bakeries, synagogues, and checkpoints, echoing the hidden and public faces of Jewish Paris.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The card invites a midrashic reading of windows and reflections, suggesting that identity is always layered and in motion.
                          </p>
                        </>
                      )}
                      {card.slug === 'poe' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Eyes That Cannot Be Alone</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I wanted to explore the tension of walking while watched, from Poe's haunted crowds to the surveillance of Jews in medieval and modern Europe.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Poe's "The Man of the Crowd," England's 1275 Statute of the Jewry, and Russian Pale of Settlement documents.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> de Certeau's idea of walking as unreadable text versus the all-seeing eye of CCTV, and Debord's psychogeography for "reverse chase."
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The mock CCTV feed flips the watcher/watched dynamic, echoing both peddler and police perspectives.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The card frames the Jewish peddler as both merchant and refugee, navigating commerce, scrutiny, and survival with every step.
                          </p>
                        </>
                      )}
                      {card.slug === 'rainyday' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Rain on the Ghetto Umbrella</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I wanted to evoke how rain transforms memory in the old Jewish quarter, blurring the boundaries between past and present, inside and outside.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Haussmann's Paris renovation blueprints, Caillebotte's "Paris Street; Rainy Day," and archival records from Rue des Écouffes.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> de Certeau's "staining" tactic—how weather marks space—and Debord's "Naked City" sensory nodes.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The before/after slider overlays ghetto lanes with modern boulevards, while the rain motif links loss and renewal.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The card uses rainwater as a medium for resurrecting erased Jewish memories, suggesting that sensory experience is itself a form of cultural survival.
                          </p>
                        </>
                      )}
                      {card.slug === 'shabbat' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Shabbat Stride</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I wanted to explore how the simple walk to synagogue reconfigures ordinary streets into sacred passageways, echoing course discussions of walking as spiritual practice.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Exodus 16:29, contemporary Jewish legal texts on techum Shabbat, Rousseau's Reveries, Thoreau's Walking, Ammons's A Poem is a Walk.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> The card considers ritual walking through the lens of poetic and philosophical reflection, drawing parallels to Rousseau's inner journeys and Ammons's embodied thought.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The map-based scroll visualizes communal boundaries, making spatial what is often legal or spiritual. Circles, not lines, organize this walk.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The Shabbat walk reminds us that slowing down is not a retreat, but a choice to reinhabit space and time more deliberately—to walk, as Ammons might say, not to arrive, but to awaken.
                          </p>
                        </>
                      )}
                      {card.slug === 'letters' && (
                        <>
                          <h4 className="text-sm font-semibold mb-2">Making Of – Chronicle in Footprints</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Why this scene?</strong> I chose a shoreline strewn with footprints to capture the tension between permanence and erasure. Each print marks a step taken, yet the next tide threatens to sweep it away—just as our documented walks preserve moments that might otherwise vanish.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Biblical exile narratives (Cain's mark, the Wandering Jew), Rebecca Solnit's reflections on memory in motion, Bruce Nauman's looping performances, and Michel de Certeau's tactics of everyday walking.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> This card reads walking as both record and ritual. Debord's psychogeographic dérive meets de Certeau's tactical detour: every footprint is a micro-action that inscribes personal history onto a shifting landscape.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> Even transient steps leave a story. By documenting each print—photo, audio, note—we push back against oblivion and turn fleeting journeys into lasting testimonies.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;