"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Scenario {
  title: string;
  description: string;
  today: string;
  breakdown: string;
  solution: string;
  slug: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Scenario>({
    title: "",
    description: "",
    today: "",
    breakdown: "",
    solution: "",
    slug: ""
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/scenarios", {
        headers: {
          "Authorization": `Bearer ${password}`
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json();
        setScenarios(data.scenarios || []);
      } else {
        setAuthError("Invalid password");
      }
    } catch {
      setAuthError("Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const fetchScenarios = async () => {
    try {
      const response = await fetch("/api/admin/scenarios", {
        headers: {
          "Authorization": `Bearer ${password}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setScenarios(data.scenarios || []);
      }
    } catch {
      console.error("Failed to fetch scenarios");
    }
  };

  const handleEdit = (scenario: Scenario) => {
    setEditingScenario(scenario);
    setFormData(scenario);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingScenario(null);
    setFormData({
      title: "",
      description: "",
      today: "",
      breakdown: "",
      solution: "",
      slug: ""
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingScenario(null);
    setIsCreating(false);
    setFormData({
      title: "",
      description: "",
      today: "",
      breakdown: "",
      solution: "",
      slug: ""
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setSaveMessage("");

    try {
      const method = isCreating ? "POST" : "PUT";
      const response = await fetch("/api/admin/scenarios", {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSaveStatus("success");
        setSaveMessage(isCreating ? "Scenario created successfully" : "Scenario updated successfully");
        await fetchScenarios();
        setTimeout(() => {
          handleCancel();
          setSaveStatus("idle");
        }, 1500);
      } else {
        setSaveStatus("error");
        setSaveMessage(data.error || "Failed to save scenario");
      }
    } catch {
      setSaveStatus("error");
      setSaveMessage("Failed to save scenario");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this scenario?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/scenarios?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${password}`
        }
      });

      if (response.ok) {
        await fetchScenarios();
      } else {
        alert("Failed to delete scenario");
      }
    } catch {
      alert("Failed to delete scenario");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  useEffect(() => {
    if (isCreating && formData.title && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, isCreating, formData.slug]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter admin password"
                required
              />
            </div>
            {authError && (
              <p className="text-red-600 text-sm mb-4">{authError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            <Link href="/" className="text-gray-700 hover:underline">Back to home</Link>
          </p>
        </div>
      </div>
    );
  }

  if (editingScenario || isCreating) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {isCreating ? "Create New Scenario" : "Edit Scenario"}
            </h1>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL path)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
                disabled={!isCreating}
              />
              {!isCreating && (
                <p className="text-sm text-gray-500 mt-1">Slug cannot be changed after creation</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What happens today</label>
              <textarea
                value={formData.today}
                onChange={(e) => setFormData({ ...formData, today: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Where accountability breaks down</label>
              <textarea
                value={formData.breakdown}
                onChange={(e) => setFormData({ ...formData, breakdown: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How human-mapped liability would change incentives</label>
              <textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={5}
                required
              />
            </div>

            {saveMessage && (
              <p className={`text-sm ${saveStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                {saveMessage}
              </p>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saveStatus === "saving"}
                className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {saveStatus === "saving" ? "Saving..." : isCreating ? "Create Scenario" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin: Manage Scenarios</h1>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Back to site
            </Link>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Create New Scenario
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Database Scenarios</h2>
            <p className="text-sm text-gray-500">These scenarios are stored in the database and can be edited.</p>
          </div>
          
          {scenarios.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No scenarios in database yet. Create one or they will be loaded from the hardcoded defaults.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {scenarios.map((scenario) => (
                <div key={scenario.slug} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{scenario.title}</h3>
                    <p className="text-sm text-gray-500">/{scenario.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(scenario)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(scenario.slug)}
                      className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Note about hardcoded scenarios</h3>
          <p className="text-sm text-blue-800">
            There are 4 hardcoded scenarios that will always appear on the site. If you create a scenario in the database with the same slug as a hardcoded one, the database version will take precedence.
          </p>
        </div>
      </div>
    </div>
  );
}
