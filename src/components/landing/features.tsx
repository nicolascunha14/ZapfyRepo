import { Coins, Gamepad2, GraduationCap, PiggyBank, Target, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Coins,
    title: "Earn & Save",
    description:
      "Learn the basics of earning and saving money through interactive lessons.",
    color: "bg-secondary-100 text-secondary-600",
  },
  {
    icon: Gamepad2,
    title: "Fun Challenges",
    description:
      "Complete quests and missions to level up and unlock new achievements.",
    color: "bg-primary-100 text-primary-600",
  },
  {
    icon: GraduationCap,
    title: "Real Skills",
    description:
      "Build financial knowledge that lasts a lifetime, one lesson at a time.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: PiggyBank,
    title: "Smart Spending",
    description:
      "Understand needs vs. wants and make smart choices with your money.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Trophy,
    title: "Rewards System",
    description:
      "Earn Zap Coins and badges as you progress through your money journey.",
    color: "bg-secondary-100 text-secondary-600",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Set savings goals and track your progress with visual milestones.",
    color: "bg-primary-100 text-primary-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Why Kids Love <span className="text-primary-500">Zapfy</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Our app makes learning about money exciting with games, challenges,
            and real-world skills.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 hover:shadow-xl transition-shadow"
            >
              <div
                className={`inline-flex rounded-xl p-3 mb-4 ${feature.color}`}
              >
                <feature.icon size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
