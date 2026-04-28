"use client";

interface StepProps {
  data: any;
  update: (data: any) => void;
}

const CATEGORIES = ["Real Estate", "Construction", "Events", "Surveying", "Infrastructure", "Other"];

export default function StepBasics({ data, update }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-syne font-bold text-white">Project Basics</h2>
        <p className="text-muted text-sm font-inter">Give your mission a name and category to help us match the right pilot.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-inter font-bold text-muted uppercase tracking-wider">Mission Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Roof Inspection - Canary Wharf"
            className="input"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-inter font-bold text-muted uppercase tracking-wider">Mission Category</label>
            <select
              value={data.category}
              onChange={(e) => update({ category: e.target.value })}
              className="input appearance-none bg-surface-dark"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-inter font-bold text-muted uppercase tracking-wider">Target Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => update({ date: e.target.value })}
              className="input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
