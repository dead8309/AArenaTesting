import { BarChartIcon, BookOpenIcon, CircleDollarSign, EditIcon, LayersIcon, TrophyIcon, UserIcon, Users, UsersIcon } from "lucide-react";

export interface Feature {
    title: string;
    description: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const features = [
    {
        title: "Personalized Learning Paths",
        description: "Create customized learning journeys tailored to your goals and interests.",
        icon: BookOpenIcon
    },
    {
        title: "Diverse Learning Domains",
        description: "Access a wide array of subjects including programming, data science, design, and marketing.",
        icon: LayersIcon
    },
    {
        title: "User Accounts and Profiles",
        description: "Track your learning progress, save favorite resources, and connect with other learners.",
        icon: UserIcon
    },
    {
        title: "User-Generated Content",
        description: "Contribute your own learning materials and resources to enrich the platform's content.",
        icon: EditIcon
    },
    {
        title: "Gamification Elements",
        description: "Stay motivated and engaged with badges, achievements, and progress milestones.",
        icon: TrophyIcon
    },
    {
        title: "Free Udemy-like Experience",
        description: "Access courses and learning paths for free, track progress, and receive certificates.",
        icon: CircleDollarSign
    },
    {
        title: "Leaderboards and Rankings",
        description: "Recognize top performers and foster competition to excel in challenges.",
        icon: BarChartIcon
    },
    {
        title: "Domain Groups for Collaborative Learning",
        description: "Join or create groups tailored to your technology interests for collaborative learning."
    }
];


