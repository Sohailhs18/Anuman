import React from 'react';
import {
  UserCheck,
  Users,
  Stethoscope,
  Activity,
  Apple,
  HeartHandshake,
  Truck,
  FlaskConical,
  Pill,
  Wrench,
  HeartPulse,
  Wind,
  Baby,
  Heart,
  ShieldAlert,
  GitCommit,
  Coffee,
  Syringe,
  ShieldPlus,
  Droplet,
  Bandage,
  Cpu,
  CloudRain,
  ShieldCheck,
  CheckCircle2,
  ClipboardCheck,
  Scissors,
  Clock,
  Award,
  BadgePercent,
  GraduationCap,
  Home,
  FileText,
  Sparkles,
  PhoneCall,
  CheckSquare
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    Users,
    Stethoscope,
    Activity,
    Apple,
    HeartHandshake,
    Truck,
    FlaskConical,
    Pill,
    Wrench,
    HeartPulse,
    Wind,
    Baby,
    Heart,
    ShieldAlert,
    GitCommit,
    Coffee,
    Syringe,
    ShieldPlus,
    Droplet,
    Bandage,
    Cpu,
    CloudRain,
    ShieldCheck,
    CheckCircle2,
    ClipboardCheck,
    Scissors,
    Clock,
    Award,
    BadgePercent,
    GraduationCap,
    Home,
    FileText,
    Sparkles,
    PhoneCall,
    CheckSquare
  };

  const IconComponent = iconMap[name] || HeartHandshake;
  return <IconComponent className={className} />;
};
