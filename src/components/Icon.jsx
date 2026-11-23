import {
  Code2, Layers, Server, Database, Workflow, Monitor, Atom, Triangle, Plug, GitBranch,
  Lock, Gauge, Smartphone, Mail, Phone, MapPin, Linkedin, Github, Download, ArrowUp, ArrowRight,
} from "lucide-react";

const map = {
  code: Code2, layers: Layers, server: Server, database: Database, workflow: Workflow,
  monitor: Monitor, atom: Atom, triangle: Triangle, plug: Plug, git: GitBranch, lock: Lock,
  gauge: Gauge, smartphone: Smartphone, mail: Mail, phone: Phone, pin: MapPin,
  linkedin: Linkedin, github: Github, download: Download, up: ArrowUp, arrow: ArrowRight,
};

export default function Icon({ name, ...props }) {
  const C = map[name] || Code2;
  return <C aria-hidden="true" {...props} />;
}
