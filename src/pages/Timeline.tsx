import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import GanttChart, { type GanttTask } from "@/components/GanttChart";

const tasks: GanttTask[] = [
  { id: "d1", label: "Discovery & Strategy", start: new Date(), end: new Date(Date.now() + 5*86400000), status: "in-progress", owner: "Max", details: "Stakeholder interviews, analytics review, success metrics." },
  { id: "d2", label: "Design & Messaging", start: new Date(Date.now() + 6*86400000), end: new Date(Date.now() + 14*86400000), status: "planned", owner: "Ava", details: "Wireframes, visual design, copywriting." },
  { id: "d3", label: "Development & Testing", start: new Date(Date.now() + 15*86400000), end: new Date(Date.now() + 28*86400000), status: "planned", owner: "Leo", details: "Build, performance, accessibility, QA." },
  { id: "d4", label: "Launch & Optimize", start: new Date(Date.now() + 29*86400000), end: new Date(Date.now() + 35*86400000), status: "planned", owner: "Team", details: "Deployment, analytics goals, iteration plan." },
];

export default function Timeline() {
  const canonical = typeof window !== 'undefined' ? window.location.href : 'https://example.com/timeline';

  return (
    <Layout>
      <Helmet>
        <title>Project Timeline Gantt | Clearline Studio</title>
        <meta name="description" content="Interactive Gantt chart timeline with hover details for project planning and tracking." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-6">Project Timeline (Gantt)</h1>
          <p className="text-muted-foreground mb-6">Hover a bar to see task owner, dates, and details.</p>
          <GanttChart tasks={tasks} />
        </div>
      </section>
    </Layout>
  );
}
