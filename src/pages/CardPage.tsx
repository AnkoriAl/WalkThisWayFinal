import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cards } from '../data/cards';
import InteractiveElement from '../components/InteractiveElements';
import Citation from '../components/Citation';
import { ChevronLeft, ChevronRight, BookOpen, Map, ScrollText, ChevronDown } from 'lucide-react';

const CardPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const card = cards.find(c => c.slug === slug);
  const cardIndex = cards.findIndex(c => c.slug === slug);
  const prevCard = cardIndex > 0 ? cards[cardIndex - 1] : cards[cards.length - 1];
  const nextCard = cardIndex < cards.length - 1 ? cards[cardIndex + 1] : cards[0];
  
  const [showMakingOf, setShowMakingOf] = React.useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
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
                  This card aligns with Week {cardIndex + 1} of the curriculum, exploring themes of walking, exile, and psychogeography.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Theory Links</h3>
                <div className="space-y-3">
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
                <InteractiveElement type={card.interactiveType} slug={card.slug} />
              </div>
              
              <div className="flex justify-between items-center mt-12">
                <Link 
                  to={`/card/${prevCard.slug}`}
                  className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  <span>Previous: {prevCard.title}</span>
                </Link>
                
                <Link 
                  to={`/card/${nextCard.slug}`}
                  className="flex items-center text-[#1c2340] hover:text-[#cba95b] transition-colors"
                >
                  <span>Next: {nextCard.title}</span>
                  <ChevronRight size={20} className="ml-1" />
                </Link>
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
                    {showMakingOf ? "Hide" : "Show"} Making-Of
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
                            medieval scholars like Kalonymus ben Kalonymus, and today’s backpackers.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Torah commands for the
                            thrice‑yearly festivals (Ex 23 &amp; Dt 16) and Psalms 120‑134, the
                            “Songs of Ascents” historically sung while climbing.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> Rebecca Solnit’s idea of a pilgrimage
                            drawing an invisible “sacred map,” Guy Debord’s <em>dérive</em> (here
                            tilted upward instead of sideways), and Michel de Certeau’s claim that
                            walkers “write texts they cannot read.”
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The interactive map layers elevation data
                            onto ancient caravan routes; the warm photo glow echoes Jerusalem’s
                            nickname “City of Gold.”
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
                            <strong>Why this scene?</strong> I wanted to connect the embodied protest of Gandhi’s Salt March with the ritual salt on the Passover table, foregrounding how small grains can catalyze sweeping change.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Gandhi’s own Salt March journals, Leviticus 2:13’s “salt of the covenant,” and Exodus 12–14’s liberation narrative.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> Rebecca Solnit’s idea of protest as punctuation in history, de Certeau’s “tactics” versus “strategy,” and Debord’s ambiance shift in revolutionary spaces.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The interactive scroller follows the Dandi shoreline, with granular salt overlays echoing both the march and the Seder’s tactile rituals.
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
                            <strong>Why this scene?</strong> I wanted to trace the footsteps from King’s Birmingham Jail letter through Selma to contemporary protests, showing how the act of walking becomes a moral argument.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Dr. King’s “Letter from Birmingham Jail,” Deuteronomy 16:20 (“Justice, justice shall you pursue”), and Amos 5:24’s call for justice to “roll down like waters.”
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> Thoreau’s “Civil Disobedience,” Solnit’s walking as witness, and de Certeau and Debord’s concepts of moral mapping in urban space.
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
                            <strong>Why this scene?</strong> I aimed to immerse the reader in the layered Jewish life of Paris’s Marais, from Dreyfus to the present, revealing how walking the same streets can mean safety or peril depending on the era.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Newspaper coverage of the Dreyfus Affair, Vel d’Hiv roundup testimonies, and Rue des Rosiers walking guides.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> de Certeau’s “pedestrian guerrilla” and Debord’s “Naked City” maps, showing how urban walking can resist or reveal power.
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
                            <strong>Why this scene?</strong> I wanted to explore the tension of walking while watched, from Poe’s haunted crowds to the surveillance of Jews in medieval and modern Europe.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Primary sources used:</strong> Poe’s “The Man of the Crowd,” England’s 1275 Statute of the Jewry, and Russian Pale of Settlement documents.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> de Certeau’s idea of walking as unreadable text versus the all-seeing eye of CCTV, and Debord’s psychogeography for “reverse chase.”
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
                            <strong>Primary sources used:</strong> Haussmann’s Paris renovation blueprints, Caillebotte’s “Paris Street; Rainy Day,” and archival records from Rue des Écouffes.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Theoretical frame:</strong> de Certeau’s “staining” tactic—how weather marks space—and Debord’s “Naked City” sensory nodes.
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Visual logic:</strong> The before/after slider overlays ghetto lanes with modern boulevards, while the rain motif links loss and renewal.
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Take-away:</strong> The card uses rainwater as a medium for resurrecting erased Jewish memories, suggesting that sensory experience is itself a form of cultural survival.
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