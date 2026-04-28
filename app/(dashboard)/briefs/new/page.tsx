"use client";

import MissionWizard from "@/components/dashboard/MissionWizard";

export default function NewBriefPage() {
  return (
    <div className="py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-syne font-bold text-white mb-2">Create New Mission</h1>
        <p className="text-muted font-inter">Follow the steps below to build your aerial mission brief.</p>
      </div>
      
      <MissionWizard />
    </div>
  );
}
