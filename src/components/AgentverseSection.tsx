import { RefreshCcw, Layers, Globe, BrainCircuit } from "lucide-react";

const AgentverseSection = () => {
  return (
    <section className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-travel-dark mb-4">
            Connected to the Agentverse
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI agents connect to a broader ecosystem of agents via
            Agentverse, enhancing their capabilities and providing you with
            richer, more comprehensive travel assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="glass-card p-8 rounded-2xl">
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-travel-primary to-travel-secondary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="absolute -inset-40 bg-travel-primary/20 rounded-full animate-pulse"
                      style={{ animationDuration: "3s" }}
                    ></div>
                    <div
                      className="absolute -inset-28 bg-travel-primary/20 rounded-full animate-pulse"
                      style={{ animationDuration: "4s" }}
                    ></div>
                    <div
                      className="absolute -inset-16 bg-travel-primary/20 rounded-full animate-pulse"
                      style={{ animationDuration: "5s" }}
                    ></div>
                  </div>
                </div>

                <BrainCircuit className="w-24 h-24 text-white relative z-10" />

                <div className="absolute top-1/4 right-1/4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <RefreshCcw className="w-6 h-6 text-white" />
                </div>

                <div className="absolute bottom-1/4 left-1/4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>

                <div className="absolute bottom-1/3 right-1/3 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2 flex items-center">
                  <div className="bg-travel-accent/20 p-2 rounded-full mr-3">
                    <RefreshCcw className="h-5 w-5 text-travel-accent" />
                  </div>
                  Agent Collaboration
                </h3>
                <p className="text-gray-600 ml-12">
                  Our agents collaborate with other specialized agents in the
                  Agentverse to enhance their capabilities and provide you with
                  more comprehensive assistance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2 flex items-center">
                  <div className="bg-travel-accent/20 p-2 rounded-full mr-3">
                    <Layers className="h-5 w-5 text-travel-accent" />
                  </div>
                  Multi-Layer Intelligence
                </h3>
                <p className="text-gray-600 ml-12">
                  WanderVerse employs a multi-layered approach to travel
                  planning, with each agent handling different aspects of your
                  journey.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2 flex items-center">
                  <div className="bg-travel-accent/20 p-2 rounded-full mr-3">
                    <Globe className="h-5 w-5 text-travel-accent" />
                  </div>
                  Global Knowledge Base
                </h3>
                <p className="text-gray-600 ml-12">
                  By connecting to Agentverse, our system accesses a
                  continuously updating global knowledge base of travel
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentverseSection;
