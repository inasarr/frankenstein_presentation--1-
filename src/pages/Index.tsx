import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    // Fallback for environments without IntersectionObserver (old browsers / WebViews)
    if (typeof IntersectionObserver === 'undefined') {
      // Ensure at least the critical sections are visible so animations don't block rendering
      setVisibleSections(prev => new Set([...prev, 'hero', 'introduction', 'characters', 'themes']));
      console.warn('IntersectionObserver not supported - using fallback to mark sections visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.debug('IO entry', entry.target?.id, entry.isIntersecting);
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      // Use a more permissive threshold/rootMargin for broader compatibility during debugging
      { threshold: 0, rootMargin: '0px' }
    );

    const observeAll = () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          try {
            observer.observe(ref);
          } catch (e) {
            console.warn('Failed to observe element', ref, e);
          }
        }
      });
    };

    // Observe initially and retry shortly after mount to handle timing issues
    observeAll();
    const retryTimer = setTimeout(observeAll, 300);

    // Also attempt to re-observe on window resize/orientation change (helps some mobile webviews)
    window.addEventListener('resize', observeAll);

    return () => {
      clearTimeout(retryTimer);
      window.removeEventListener('resize', observeAll);
      observer.disconnect();
    };
  }, []);

  const isVisible = (sectionId) => visibleSections.has(sectionId);

  return (
    <div className="min-h-screen bg-frankenstein-gradient relative overflow-hidden">
      {/* Reduced Background Effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-subtle-pulse"></div>
        <div className="absolute bottom-32 right-32 w-1 h-1 bg-electric-green rounded-full animate-gentle-flicker" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary rounded-full animate-subtle-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section 
          id="hero" 
          ref={el => sectionRefs.current.hero = el}
          className="min-h-screen flex items-center justify-center p-8 bg-hero"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className={`transition-all duration-2000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h1 className="font-horror mb-8 animate-text-glow text-center text-primary text-shadow-frankenstein w-full" style={{
                fontSize: '100px',
                textAlign: 'center'
              }}>
                FRANKENSTEIN
              </h1>
              <h2 className="text-6xl md:text-7xl font-elegant text-secondary mb-10 animate-float-up">
                (2025)
              </h2>
              <div className="mt-10">
                <Badge variant="outline" className="text-3xl px-10 py-6 border-primary text-primary animate-gentle-glow">
                  Release Year: 2025
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Film Introduction */}
        <section 
          id="introduction" 
          ref={el => sectionRefs.current.introduction = el}
          className="min-h-screen flex items-center p-8 bg-characters"
        >
          <div className="max-w-6xl mx-auto">
            <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein transition-all duration-2000 hover:animate-card-hover ${isVisible('introduction') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <CardHeader className="text-center">
                <CardTitle className="font-elegant text-6xl md:text-7xl text-primary mb-8 animate-gentle-glow">Film Introduction</CardTitle>
                <div className="flex justify-center mb-8">
                  <img src="./images/frankenstein-laboratory-netflix-2k-wallpaper-uhdpaper.com-546@5@j.jpg" alt="Frankenstein 2025 - Laboratory Scene" className="w-full max-w-2xl rounded-lg shadow-frankenstein animate-float-up h-[320px] object-cover" />
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-elegant text-4xl md:text-5xl text-secondary">Film Context</h3>
                    <p className="text-xl md:text-2xl leading-relaxed">
                      Frankenstein (2025) is a modern reinterpretation of Mary Shelley's classic novel, 
                      exploring themes of creation, responsibility, and isolation.
                    </p>
                    <p className="text-xl md:text-2xl leading-relaxed">
                      The film is directed by an emerging filmmaker who has gained recognition for innovative 
                      visual storytelling and the ability to reinterpret classic literary texts.
                    </p>
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <p className="text-lg font-semibold text-primary mb-3">Director's Vision:</p>
                      <p className="text-lg md:text-xl">The director brings a contemporary perspective to Shelley's timeless tale, using cutting-edge cinematography to explore the psychological depths of both creator and creation.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Characters Section */}
        <section 
          id="characters" 
          ref={el => sectionRefs.current.characters = el}
          className="min-h-screen flex items-center p-8 bg-themes"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-8xl md:text-9xl font-gothic text-center mb-20 text-shadow-frankenstein transition-all duration-2000 animate-text-glow ${isVisible('characters') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              CHARACTERS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Victor Frankenstein */}
              <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('characters') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <CardHeader>
                  <CardTitle className="font-elegant text-4xl md:text-4xl text-primary">Victor Frankenstein</CardTitle>
                  <CardDescription className="text-xl md:text-2xl text-muted-foreground"> The Egocentric Visionary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <img src="./images/Immagine2.png" alt="Victor Frankenstein" className="w-full rounded-lg shadow-frankenstein animate-gentle-flicker h-[240px] object-cover" />
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-secondary/80 text-lg px-4 py-2">Protagonist</Badge>
                    <Badge variant="outline" className="border-accent text-accent text-lg px-4 py-2">Scientist</Badge>
                    <Badge variant="outline" className="border-accent text-accent text-lg px-4 py-2">Surgeon</Badge>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-elegant text-2xl md:text-3xl text-primary">Character Traits</h4>
                    <ul className="space-y-3 text-lg md:text-xl">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Possesses "titanic egocentrism" and intellectual hubris</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Driven by inherited trauma from an abusive, cold father and the loss of his mother</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Repeats abusive patterns by acting as an impatient and unaffectionate parent to his creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>He is described as "highly intelligent but emotionally stupid"</span>
                      </li>
                    </ul>
                  </div>

                  <blockquote className="italic text-xl md:text-2xl border-l-4 border-primary pl-6 text-muted-foreground bg-muted/20 p-6 rounded">
                    "I had a vision, an idea took shape in my mind: inevitable, unavoidable, until it became truth."
                  </blockquote>
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="text-lg md:text-xl font-semibold text-primary mb-3">Quote Explanation:</p>
                    <p className="text-lg md:text-xl leading-relaxed">
                      This quote highlights Victor’s scientific tunnel vision. Once an obsession becomes "truth" in his mind, it justifies the violation of any ethical boundary or natural law. He views his quest for reanimation as an inevitable destiny, ignoring the warnings of those around him until his "vision" results in total destruction
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* The Creature */}
              <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('characters') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{transitionDelay: '0.3s'}}>
                <CardHeader>
                  <CardTitle className="font-elegant text-4xl md:text-4xl text-accent">The Creature</CardTitle>
                  <CardDescription className="text-xl md:text-2xl text-muted-foreground">The Archetype of the Unwanted Child</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <img src="./images/Immagine3.png" alt="The Creature" className="w-full rounded-lg shadow-frankenstein animate-subtle-pulse h-[240px] object-cover" />
                  <div className="space-y-3">
                    <Badge variant="destructive" className="bg-destructive/80 text-lg px-4 py-2">Antagonist</Badge>
                    <Badge variant="outline" className="border-accent text-accent text-lg px-4 py-2">Tragic Victim</Badge>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-elegant text-2xl md:text-3xl text-accent">Character Development</h4>
                    <ul className="space-y-3 text-lg md:text-xl">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span >Newborn Innocence: Functions like a newborn at birth, seeking only love and nurturing from his "father"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Self-Educated Outcast: Gains knowledge and empathy through observing a family in the woods and befriending a Blind Man who teaches him to read and speak</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>The Descent into Rage: Transformed by parental neglect and societal rejection, his initial desire for kindness is corrupted into a need for mastery over his creator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">•</span>
                        <span>Final Reconciliation: Ultimately breaks the cycle of generational trauma by choosing forgiveness over vengeance in the film’s closing moments</span>
                      </li>
                    </ul>
                  </div>

                  <blockquote className="italic text-xl md:text-2xl border-l-4 border-accent pl-6 text-muted-foreground bg-muted/20 p-6 rounded">
                    "Not something. Someone. You made someone."
                  </blockquote>
                  <div className="bg-accent/10 p-6 rounded-lg">
                    <p className="text-lg md:text-xl font-semibold text-accent mb-3">Quote Explanation:</p>
                    <p className="text-lg md:text-xl leading-relaxed">
                      This quote marks the film’s moral pivot point. By correcting Victor’s use of the word "something," the Creature asserts his own personhood and soul. He refuses to be categorized as a mere scientific experiment or a "wreckage assembled from refuse," demanding that his creator recognize the sentient life he has brought into the world. This highlights the tragedy of a being who is physically "monstrous" but possesses a "heart purer than that of the common man"
                    </p>
                  </div>
                  
                </CardContent>
              </Card>

              {/* Elizabeth */}
              <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('characters') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{transitionDelay: '0.6s'}}>
                <CardHeader>
                  <CardTitle className="font-elegant text-4xl md:text-4xl text-primary">Elizabeth</CardTitle>
                  <CardDescription className="text-xl md:text-2xl text-muted-foreground">The Conscience of the Narrative</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <img src="./images/miagoth_jpg_1280x720_crop_q85.webp" alt="Elizabeth" className="w-full rounded-lg shadow-frankenstein animate-float-up h-[240px] object-cover" />
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-secondary/80 text-lg px-4 py-2">Supporting Character</Badge>
                    <Badge variant="outline" className="border-primary text-primary text-lg px-4 py-2">Fiancée to William Frankenstein</Badge>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-elegant text-2xl md:text-3xl text-primary">Symbolic Role</h4>
                    <ul className="space-y-3 text-lg md:text-xl">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Acts as the primary advocate for the Creature’s humanity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Represents an intellectualism rooted in curiosity and love for nature rather than control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Serves as a moral compass that Victor constantly ignores</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Her death, caused accidentally by Victor, symbolizes the ultimate consequence of his unchecked ego</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="text-lg md:text-xl font-semibold text-primary mb-3">Character Analysis:</p>
                    <p className="text-lg md:text-xl leading-relaxed">
                       In this adaptation, Elizabeth is the film's most modern figure, looking beyond fear to recognize the "soul" in the Creature. While Victor sees the body as a mechanism, Elizabeth believes that "choice is the seat of the soul". She serves as a "twin soul" to the Creature because both are outsiders in a world dictated by masculine pride. She is the only character who attempts to understand others without ego, making her the emotional bridge that Victor is too "emotionally stupid" to cross
                    </p>
                  </div>

                  <blockquote className="italic text-xl md:text-2xl border-l-4 border-primary pl-6 text-muted-foreground bg-muted/20 p-6 rounded">
                    "In those eyes I saw pain, and what is pain if not evidence of intelligence?"
                  </blockquote>
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <p className="text-lg md:text-xl font-semibold text-primary mb-3">Quote Explanation:</p>
                    <p className="text-lg md:text-xl leading-relaxed">
                      Elizabeth uses empathy as a tool for validation. Unlike Victor, who demands the Creature speak perfectly to prove its worth, Elizabeth recognizes that the Creature’s capacity to suffer is proof of its sentience and personhood. She uses this observation to challenge Victor’s clinical blindness, insisting that he has created a "someone," not just a "something"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Themes Section */}
        <section 
          id="themes" 
          ref={el => sectionRefs.current.themes = el}
          className="min-h-screen flex items-center p-8 bg-context"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-8xl md:text-9xl font-gothic text-center mb-20 text-shadow-frankenstein transition-all duration-2000 animate-text-glow ${isVisible('themes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              MAIN THEMES
            </h2>
            
            
              {/* Isolation and Solitude */}
              <Card className={`mb-10 bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('themes') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <CardHeader>
                  <CardTitle className="font-elegant text-5xl text-center text-primary">
                    🏰 Isolation and Solitude
                  </CardTitle>
                  <CardDescription className="text-xl text-center">Separation from society</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <img src="./images/frankenstein-2025-1200-1200-675-675-crop-000000.jpg" alt="Isolation" className="w-full rounded-lg shadow-frankenstein animate-gentle-flicker h-[256px] object-cover" />
                  
                  <p className="text-xl md:text-1xl leading-relaxed">
                       In Frankenstein (2025), isolation is not merely a physical state but a metaphysical prison that traps both the creator and the creation. The director has described the story as one of the most "powerful portraits of loneliness" ever written, focusing on the tortured bond between two beings condemned by their own nature—one by hubris and the other by appearance.
                  </p>
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                      <h4 className="font-elegant text-2xl text-primary mb-4">Victor's Isolation</h4>
                      <p className="text-lg mb-4">Victor’s isolation is self-imposed, fueled by his "titanic egocentrism" and his conviction that he is a visionary who must transcend natural laws. He retreats into a "deliriously phallic tower" to conduct his experiments, a setting that serves as a visual metaphor for his attempt to assert masculine dominance over nature while severing all ties to his family and the medical community. Even when offered partnership, he remains emotionally detached, unable to grasp the human connections he is systematically destroying</p>
                      <blockquote className="italic text-lg border-l-2 border-primary/50 pl-4 text-muted-foreground bg-muted/20 p-4 rounded mb-4">
                        "I work alone."
                      </blockquote>
                      <div className="bg-primary/10 p-4 rounded">
                        <p className="text-base font-semibold text-primary mb-2">Meaning:</p>
                        <p className="text-base">This brief but definitive statement captures Victor's intellectual arrogance. By choosing to work in total secrecy and solitude, he intentionally removes himself from the ethical oversight and moral grounding of society. His isolation becomes the breeding ground for his madness, as he prioritizes the "miracle" of animation over the responsibility of care, eventually realizing too late that his pursuit of the "edge of the Earth" left him with no horizon and no human connection to return to.</p>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-accent">
                      <h4 className="font-elegant text-2xl text-accent mb-4">The Creature's Forced Solitude</h4>
                      <p className="text-lg mb-4">Unlike Victor, the Creature’s isolation is a merciless punishment for his very existence. Abandoned at birth and described as a "wreckage, assembled from refuse," he is cast into a world that rejects him instinctively because of his monstrous form. He experiences the world as a "lonely child" who learns about humanity through observation from the shadows, wanting only to be seen and loved for his full self.</p>
                      <blockquote className="italic text-lg border-l-2 border-accent/50 pl-4 text-muted-foreground bg-muted/20 p-4 rounded mb-4">
                        "I cannot die. And I cannot live... alone."
                      </blockquote>
                      <div className="bg-accent/10 p-4 rounded">
                        <p className="text-base font-semibold text-accent mb-2">Meaning:</p>
                        <p className="text-base">This quote highlights the existential horror of the Creature’s condition: he has been granted immortality but denied belonging. His loneliness is not a choice but an inherited trauma passed down from a "bad father" who refused to nurture him. The realization that he is biologically incapable of the "sweet release of death" turns his solitude into an infinite sentence, driving him to demand a companion who can share his "language of exile".</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            

              {/* Light and Darkness */}
              <Card className={`mb-10 bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('themes') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{transitionDelay: '0.3s'}}>
                <CardHeader>
                  <CardTitle className="font-elegant text-5xl text-center text-primary">
                    ⚡ Light and Darkness
                  </CardTitle>
                  <CardDescription className="text-xl text-center">The symbolism of knowledge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <img src="./images/579632715_1273342801486442_4968998177808603409_n.jpg" alt="Lightning" className="w-full rounded-lg shadow-frankenstein animate-electric h-[260px] object-cover" />
                  
                  <p className="text-xl md:text-1xl leading-relaxed">
                       The visual language of light and darkness transcends simple "good vs. evil" tropes. Instead, it uses chiaroscuro tones and painterly shadows to reflect the intellectual journey of the creator and the sensory awakening of the creation. Light represents the blinding nature of scientific hubris, while darkness often mirrors the moral void left by the abandonment of ethics
                  </p>
                  <div className="space-y-6">
                    <div className="bg-electric-gradient p-6 rounded-lg text-background">
                      <h4 className="font-elegant text-2xl mb-4">💡 Light as Science and the "Divine Spark"</h4>
                      <p className="text-lg mb-4">Victor Frankenstein views his work as a way to "illuminate" the dark mysteries of death. Light symbolizes his defiance of traditional medical dogma and his desire to play a god-like role. However, this light is often artificial and clinical, confined to his "deliriously phallic tower" where he isolates himself from the natural world.</p>
                      <blockquote className="italic text-xl md:text-1xl border-l-4 border-primary pl-6 text-muted-foreground bg-muted/80 p-6 rounded mb-6">
                            "Ignite a divine spark... in these young students’ minds. Teach them defiance rather than obedience. Show that man may pursue nature to her hiding places and stop death."
                      </blockquote>
                      <div className="bg-muted/60 p-4 rounded">
                        <p className="text-base font-semibold text-primary mb-2">Meaning:</p>
                        <p className="text-base">Victor uses the metaphor of the "divine spark" to justify his scientific transgression. To him, light is a tool of mastery used to "coax" answers from nature through disobedience. This scientific illumination is ultimately blinding; it allows him to see the mechanics of the body ("tissue" and "muscle") while remaining completely blind to the "spiritual content" and soul of the being he creates.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/20 to-electric-green/20 p-8 rounded-lg border-l-4 border-primary">
                          <h4 className="font-elegant text-2xl text-primary mb-4 xl:text-xl">The Essence of Natural Life</h4>
                          <p className="text-lg mb-4">
                            In contrast to the flickering candles and galvanic sparks of the laboratory, the sun represents a life force that exists outside of Victor’s control. It is the first thing Victor uses to teach the Creature about the world, creating a brief moment of parental warmth before the cycle of abuse begins.
                          </p>

                          <blockquote className="italic text-xl md:text-1xl border-l-4 border-primary pl-6 text-muted-foreground bg-muted/20 p-6 rounded mb-6">
                            "Sunlight. The sun is... The sun is life."
                          </blockquote>
                          <div className="bg-accent/10 p-4 rounded">
                            <p className="text-base font-semibold text-accent mb-2">Meaning:</p>
                            <p className="text-base">This quote establishes the sun as the ultimate symbol of unconditioned existence. While Victor's "light" is a product of stolen lightning and corpses, the sun represents a purity that the Creature yearns for but is eventually exiled from. The film’s final shot—the Creature reaching out to embrace the sunlight alone in the Arctic—symbolizes his spiritual endurance and his attempt to find peace with his own "merciless life" after the death of his creator.</p>
                          </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/20 to-electric-green/20 p-8 rounded-lg border-l-4 border-primary">
                          <h4 className="font-elegant text-2xl text-primary mb-4 xl:text-xl">Lightning: The Violent Spark of Creation</h4>
                          <p className="text-lg mb-4">
                            Lightning serves as the literal and symbolic bridge between the heavens and the "charnel house". It represents the Modern Prometheus stealing fire from the gods, but in del Toro’s vision, this spark is accompanied by "visceral body horror" and "gory detail".
                          </p>

                          <div className="bg-accent/10 p-4 rounded">
                            <p className="text-base font-semibold text-accent mb-2">Symbolic meaning:</p>
                            <p className="text-base"> The use of electricity to animate the Creature represents science overriding natural law. The "invigorating volts" that Jacob Elordi’s Creature receives are not a gift of love, but a mechanical imposition of "merciless life". The motif of the lightning storm signifies that great discovery, when divorced from moral responsibility, becomes a force of pure destruction—culminating in the explosion of Victor’s tower.</p>
                          </div>
                    </div>
                    
                    <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-destructive">
                      <h4 className="font-elegant text-2xl text-destructive mb-4">🌑 The Dark Angel: Ambition’s Shadow</h4>
                      <img src="./images/dark.webp" alt="dark angel" className="w-full rounded-lg shadow-frankenstein animate-gentle-flicker h-[256px] object-cover mb-4" />
                      <p className="text-lg mb-4">Victor is haunted by a recurring vision of a "Dark Angel"—a tall, burning red figure with wings like molten glass. While Victor interprets this figure as a divine promise of command over life and death, it serves as a visual motif for his internal corruption and self-loathing.</p>
                      <blockquote className="italic text-xl md:text-1xl border-l-4 border-primary pl-6 text-muted-foreground bg-muted/10 p-6 rounded mb-6" style={{ borderColor: '#D92626' }}>
                            "I was born anew that night. I had a vision. I saw, for the first time... the Dark Angel. And it made me a promise. I would have command over the forces of life and death."
                      </blockquote>
                      <div className="bg-destructive/10 p-4 rounded">
                        <p className="text-base font-semibold text-destructive mb-2">Meaning:</p>
                        <p className="text-base">The Dark Angel symbolizes the "spiritual mistake" men make when they mistake their own ego for divine permission. The use of red in these visions connects to the "avenging horror" of Victor’s trauma regarding his mother’s death. It represents a "fire" that Victor cannot contain, which ultimately burns him and everyone he loves. This motif highlights that Victor’s "light" of knowledge is actually born from a deep, unrecognized darkness within his own psyche.</p>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            
            {/* Creation and Destruction */}
            <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('themes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{transitionDelay: '0.6s'}}>
              <CardHeader>
                <CardTitle className="font-elegant text-5xl text-center text-primary">
                  🧬 Creation and Destruction
                </CardTitle>
                <CardDescription className="text-center text-xl">The eternal cycle of life</CardDescription>
                <p className="text-lg leading-relaxed">
                        Creation and destruction are not opposite forces but two sides of the same coin. Victor Frankenstein views the act of creation as a "miracle" and a "divine act" that justifies any human or moral cost. However, because his "miracle" is born from "tissue" and "muscle" without the "intent to love," the life he creates is inextricably linked to the "conflagration" that eventually devours his entire world.
                      </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    
                    <h3 className="font-elegant text-3xl text-primary">Creation</h3>
                    <img src="./images/14cul-new-frankenstein-zfbp-articleLarge.webp" alt="Creation" className="w-full h-48 object-cover rounded-lg shadow-frankenstein animate-subtle-pulse" />
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        Creation represents the peak of Enlightenment hubris, the belief that scientific knowledge can and should override natural and divine laws. Victor constructs his "composite subject" using the discarded bodies of criminals and soldiers, seeing them only as biological mechanisms rather than people. The act of creation is portrayed as a "spiritual mistake" where Victor’s ego blinded him to the responsibility of being a "father" to the life he animated.
                      </p>
                      <blockquote className="italic text-lg border-l-4 border-primary pl-4 text-muted-foreground bg-muted/20 p-4 rounded">
                        "I never considered what would come after creation. In having reached the edge of the Earth, there was no horizon left."

                      </blockquote>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-base font-semibold text-primary mb-2">Meaning:</p>
                        <p className="text-base leading-relaxed">
                          Victor describes the existential void that follows his success. He was so obsessed with the "idea" of creation that he had no plan for the sentient being that resulted from it. By reaching the "edge of the Earth" (the limit of scientific achievement), he lost his moral "horizon," showing that creation without a purpose or emotional guidance is "void of meaning" and leads only to a spiritual wasteland.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-elegant text-3xl text-destructive">Destruction</h3>
                    <img src="./images/hq720.jpg" alt="Destruction" className="w-full h-48 object-cover rounded-lg shadow-frankenstein animate-gentle-flicker" />
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        Destruction in the film is the physical manifestation of parental and moral abandonment. The "monster" is not born destructive; he becomes an agent of chaos only after being rejected and "denied the sweet release of death". This destruction is not random; it is personal and cyclical, as the Creature learns violence from the very creator who was supposed to nurture him. Ultimately, Victor’s "achievement" becomes his "torment" as he realizes he has "cheated death" only to generate a more profound and enduring form of it.
                      </p>
                      <blockquote className="italic text-lg border-l-4 border-destructive pl-4 text-muted-foreground bg-muted/20 p-4 rounded">
                        "In seeking life, I created death."
                      </blockquote>
                      <div className="bg-destructive/10 p-4 rounded-lg">
                        <p className="text-base font-semibold text-destructive mb-2">Meaning:</p>
                        <p className="text-base leading-relaxed">
                          This line serves as the central irony of Victor’s life. His scientific goal was to "stop death entirely," yet his refusal to accept the humanity of his Creature led directly to the violent deaths of those he loved. It signifies that scientific ambition, when divorced from virtue and empathy, creates a self-perpetuating cycle of ruin rather than true life.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-elegant text-2xl text-center text-secondary mb-4">The Cycle of Creation and Destruction</h4>
                  <p className="text-lg text-center leading-relaxed">
                    The film presents these forces as an inseparable "Waltz" where the birth of the monster is visualised as something "equal parts birth and funeral". The "bad father" archetype is the engine of this cycle: Victor’s father passes his cold violence to Victor, who then passes it to the Creature. This cycle only breaks at the very end of the film through an act of redemption and forgiveness, suggesting that while creation can lead to destruction, the "broken heart" can still find a way to "brokenly live on" through compassion rather than mastery.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Nature vs Nurture */}
            <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 mt-8 ${isVisible('themes') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{transitionDelay: '0.9s'}}>
              <CardHeader>
                <CardTitle className="font-elegant text-4xl text-center text-secondary">
                  🌿 Nature vs Nurture
                </CardTitle>
                <CardDescription className="text-center text-xl">The eternal debate on the origin of behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center space-y-4">
                    <Badge variant="outline" className="text-xl px-6 py-3 animate-gentle-glow">Nature</Badge>
                    <p className="text-lg">In this adaptation, the Creature is born with "newborn innocence", initially seeking only love and guidance from Victor. His nature is depicted as gentle and curious, as seen in his early interactions with sunlight, water, and eventually Lady Elizabeth. The film argues that his character is not defined by his patchwork "making," but by the personhood he possesses from the moment of reanimation.</p>
                  </div>
                  <div className="text-center space-y-4">
                    <Badge variant="secondary" className="text-xl px-6 py-3 animate-subtle-pulse">Nurture</Badge>
                    <p className="text-lg">The film explicitly portrays Victor Frankenstein as an "emotionally stupid" parent who repeats the abusive patterns of his own father, Leopold. Victor treats the Creature as a "scientific curiosity" or a "wreckage" rather than a son. This absence of guidance and the presence of parental cruelty—such as Victor beating the Creature with a metal rod—directly transforms the Creature’s initial desire for kindness into a survival-based rage.</p>
                  </div>
                  <div className="text-center space-y-4">
                    <Badge variant="destructive" className="text-xl px-6 py-3 animate-gentle-flicker">Consequences</Badge>
                    <p className="text-lg">The film explores how environment and education shape behavior more than innate biology. The Creature absorbs the violence of the world around him, realizing that "violence felt inevitable" in a society that hunts you simply for who you are. He eventually masters his creator not because he is a beast, but because he has learned Victor’s own "language" of pain and dominance.</p>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-elegant text-2xl text-center text-primary mb-4">Central Question: Who is the Real Monster?</h4>
                  <p className="text-lg text-center leading-relaxed">
                    The film moves toward a conclusion where the "monster" is able to break the cycle of abuse through an act of forgiveness that Victor himself was never taught. This suggests that while "nurture" can corrupt an innocent being, the capacity for choice remains the ultimate seed of the soul.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Historical Context */}
        <section 
          id="context" 
          ref={el => sectionRefs.current.context = el}
          className="min-h-screen flex items-center p-8 bg-reflection"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-8xl md:text-9xl font-gothic text-center mb-20 text-shadow-frankenstein transition-all duration-2000 animate-text-glow ${isVisible('context') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              HISTORICAL CONTEXT
            </h2>
            
            <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 mb-12 ${isVisible('context') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <CardHeader>
                <CardTitle className="font-elegant text-5xl text-primary flex items-center gap-3">
                  🎭 The Romantic Movement
                </CardTitle>
                <CardDescription className="text-xl">Mary Shelley's era and cultural influence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <img 
                  src="./images/photo-1640273837947-ea830d50c191.avif" 
                  alt="Romanticism" 
                  className="w-full h-64 object-cover rounded-lg shadow-frankenstein animate-gentle-flicker"
                />
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="font-elegant text-3xl text-primary">Romantic Values</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-xl">•</span>
                        <span>Emotion and Nature: The film values empathy and feeling as tools for understanding, contrasting them with the clinical dissection of reason.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-xl">•</span>
                        <span>Beauty and Terror: Del Toro contrasts the "sublime beauty" of the natural world with the visceral horror of the laboratory. The Creature itself embodies this, possessing a "shimmering, bruised beauty" made of "overlapping panels of skin".</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-xl">•</span>
                        <span> Nature as an Active Character: The environment is not a mere backdrop; it reflects the characters' metaphysical isolation. The Arctic sequences serve as a direct visual homage to the Romantic masterpiece The Sea of Ice by Caspar David Friedrich.</span>
                      </li>
                    </ul>
                    
                    <div className="bg-primary/10 p-4 rounded">
                      <p className="text-base font-semibold text-primary mb-2">Movement Explanation:</p>
                      <p className="text-lg">The Romantic movement emphasized that true understanding comes through emotion and the senses rather than just the intellect. In the film, this is represented by Elizabeth, whose intellectualism is rooted in curiosity and a love for nature. She views the "symmetry and shapes" of the world as "God's design," serving as a foil to Victor’s desire to conquer and control.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-elegant text-3xl text-secondary">Scientific Progress</h3>
                    <p className="text-lg mb-6">The film portrays Victor Frankenstein as the "prodigal son of Enlightenment rationalism," a man who views nature as a mechanism to be understood and mastered. The setting in the 1850s highlights a time of explosive growth in industrial dye chemistry, steel engineering, and medical discovery.</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-electric-gradient rounded-full flex items-center justify-center mx-auto mb-2 animate-electric">
                          ⚡
                        </div>
                        <p className="text-base font-semibold">Electricity</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-subtle-pulse">
                          🧬
                        </div>
                        <p className="text-base font-semibold">Life</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-gentle-glow">
                          🧠
                        </div>
                        <p className="text-base font-semibold">Mind</p>
                      </div>
                    </div>

                    <div className="bg-secondary/10 p-4 rounded">
                      <p className="text-base font-semibold text-secondary mb-2">Scientific Context:</p>
                      <p className="text-base">The early 19th century was defined by the discovery of galvanism—the idea that electrical impulses could animate tissue. Victor utilizes a "lightning rod system of pure silver" and "high-capacity voltaic batteries" to harness this power. His unethical experiments are fueled by the Crimean War, as he harvests body parts from soldiers killed on the battlefield and criminals pre-selected from the gallows. This context suggests that when scientific progress is divorced from moral responsibility, it treats human lives as disposable "composite subjects".</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </section>

        {/* Contemporary Ethical Issues */}
        <section 
          id="ethics" 
          ref={el => sectionRefs.current.ethics = el}
          className="min-h-screen flex items-center p-8 bg-ethics"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-8xl md:text-9xl font-gothic text-center mb-20 text-shadow-frankenstein transition-all duration-2000 animate-text-glow ${isVisible('ethics') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              CONTEMPORARY ETHICAL ISSUES
            </h2>
            
            <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 mb-12 ${isVisible('ethics') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <CardHeader>
                <CardTitle className="font-elegant text-5xl text-center text-primary">
                  🧪 Modern Science and Moral Implications
                </CardTitle>
                <CardDescription className="text-center text-xl">Frankenstein's relevance to today's scientific challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <h3 className="font-elegant text-3xl text-primary">Creator's Responsibility</h3>
                    <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                      <p className="text-lg mb-4">In the film, Victor Frankenstein exemplifies "terminal stupidity" by focusing entirely on the technical "miracle" of reanimation while ignoring the moral obligation to nurture the resulting life. His refusal to acknowledge the Creature’s personhood transforms a scientific breakthrough into a "generational cycle of abuse". Victor treats his creation as "tissue" and "muscle" rather than a sentient being, repeating the cold, intellectual detachment he inherited from his own father.</p>
                      <blockquote className="italic text-lg border-l-2 border-primary/50 pl-3 text-muted-foreground bg-muted/20 p-3 rounded mb-4">
                        "Perhaps God is inept! And it is we that must amend his mistakes!"
                      </blockquote>
                      <div className="bg-primary/10 p-4 rounded mb-4">
                        <p className="text-base font-semibold text-primary mb-2">Meaning:</p>
                        <p className="text-base">This quote marks the peak of Victor’s intellectual hubris. He justifies his unethical experiments by framing them as a necessary correction to a "flawed" divine order, positioning himself as a "Modern Prometheus" entitled to break natural laws. However, this "divine spark" of knowledge is fundamentally blinding, as Victor seeks to master the mechanics of life without developing the "moral courage" to handle the emotional and social consequences of his success.</p>
                      </div>
                      <blockquote className="italic text-lg border-l-2 border-primary/50 pl-3 text-muted-foreground bg-muted/20 p-3 rounded mb-4">
                        "I never considered what would come after creation. In having reached the edge of the Earth, there was no horizon left."
                      </blockquote>
                      <div className="bg-primary/10 p-4 rounded">
                        <p className="text-base font-semibold text-primary mb-2">Meaning:</p>
                        <p className="text-base">This confession highlights the ethical void at the heart of Victor’s ambition. He admits that he viewed the act of creation as an endpoint—a way to "best" his father and satisfy his ego—rather than the beginning of a lifelong responsibility. By reaching the "edge of the Earth" (the limits of science), he finds himself in a moral wasteland where his achievement is "void of meaning" because it lacks the "intent to love".</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-elegant text-3xl text-accent">Ethical Reflection</h3>
                    <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-accent">
                      <p className="text-lg mb-4">The film invites us to reflect on how our inventions mirror our own flaws and "titanic egocentrism". It suggests that a creation only becomes "monstrous" when it is denied the unconditional acceptance and guidance required for its development.</p>
                      <div className="bg-accent/10 p-4 rounded">
                        <p className="text-base font-semibold text-accent mb-2">Modern Application:</p>
                        <p className="text-base">n an era of rapid technological advancement in fields like CRISPR and AI, we must ask if our pursuit of "progress" is divorced from virtue. The film acts as a cautionary tale: when knowledge is pursued without moral responsibility, the "broken heart" of the creation is an inevitable result of the creator's narcissism. We are reminded that "salvation is other people" and that the ethical path forward requires us to prioritize compassion over mastery.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Personal Reflection */}
        <section 
          id="reflection" 
          ref={el => sectionRefs.current.reflection = el}
          className="min-h-screen flex items-center p-8 bg-characters"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-8xl md:text-9xl font-gothic text-center mb-20 text-shadow-frankenstein transition-all duration-2000 animate-text-glow ${isVisible('reflection') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              PERSONAL REFLECTION
            </h2>

            {/* Modern Connections */}
            <Card className={`mb-10 bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('context') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{transitionDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="font-elegant text-5xl text-center text-accent">
                  🌐 Connections to the Modern World
                </CardTitle>
                
              </CardHeader>
              <CardContent>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-muted/30 border-primary/30 hover:animate-card-hover">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-elegant text-primary">🤖 Technology & Responsibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">Director Guillermo del Toro has explicitly identified Victor Frankenstein as an analogy for modern-day "tech bros" and the AI industry, highlighting the danger of pursuing progress without judgment or sense. The film suggests that true power lies not just in "giving life," but in the willingness to nurture and take responsibility for what we create; knowledge without wisdom or compassion lead only to ruin.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-secondary/30 hover:animate-card-hover">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-elegant text-secondary">😔 Social Isolation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">The story remains one of the most powerful portraits of loneliness ever written, reflecting modern dynamics of digital isolation and the "male loneliness epidemic". The Creature’s struggle to be seen as a "someone" rather than an "it" mirrors the alienation felt by those excluded from connected societies.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-accent/30 hover:animate-card-hover">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-elegant text-accent">🚀 Scientific-Technological Ambition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">Our era shares Victor’s Promethean ambition to transcend natural limits, from genome editing to uploading consciousness to the cloud. Frankenstein serves as a warning that scientific ambition is a problem when it forsakes human connection and moral accountability.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-destructive/30 hover:animate-card-hover">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-elegant text-destructive">⚖️ Justice & Acceptance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">The Creature's fight for understanding mirrors modern battles for inclusion and social justice. Critics have noted the film functions as a queer allegory, illustrating the pursuit of being loved for one's full self, and as a reflection of the disabled experience, where the "monster" is defined by a world that refuses to see its soul.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-card/90 backdrop-blur-sm border-frankenstein shadow-frankenstein hover:animate-card-hover transition-all duration-2000 ${isVisible('reflection') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <CardHeader>
                <CardTitle className="font-elegant text-5xl text-center text-primary">
                  Final Reflection
                </CardTitle>
                <CardDescription className="text-center text-xl">Final thoughts on the film's enduring relevance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  
                </div>
                
                <img 
                  src="./images/Immagine4.jpg" 
                  alt="Modern Technology" 
                  className="w-full rounded-lg shadow-frankenstein mx-auto animate-subtle-pulse h-[300px] object-cover"
                />
                
                <div className="bg-muted/30 p-8 rounded-lg border-l-4 border-primary">
                  <blockquote className="text-2xl italic font-elegant text-center text-primary mb-6 animate-gentle-flicker">
                    "The true lesson of Frankenstein is not to fear science, but to embrace it with wisdom, compassion, and responsibility."
                  </blockquote>
                  <div className="bg-primary/10 p-4 rounded">
                    <p className="text-base font-semibold text-primary mb-2">Final Reflection:</p>
                    <p className="text-lg text-center leading-relaxed">
                      The main lesson of del Toro’s Frankenstein is that we should not be afraid of science itself, but of what happens when knowledge is placed above human feelings. In a time of fast technological progress, Shelley’s myth reminds us that our greatest creations can turn into our greatest dangers if they are not guided by responsibility and love. The film ultimately suggests that, even if the world hurts us, we must learn to “brokenly live on” through empathy and forgiveness.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/20 p-6 rounded-lg">
                  <h4 className="font-elegant text-2xl text-center text-secondary mb-4">Academic Year 2025-2026</h4>
                  
                  <p className="text-center text-lg font-semibold text-primary">
                    Frankenstein Analysis 2025. Made by Sara Luongo. All rights reserved.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
