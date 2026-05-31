"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { getSalesLeads } from "@/services/loan.service";

interface Lead {
  _id: string;

  name: string;

  email: string;

  createdAt: string;
}

export default function SalesLeadsTable() {

  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {

    try {

      const response =
        await getSalesLeads();

      setLeads(
        response.leads || response
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to fetch leads"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading leads...
      </div>
    );
  }

  return (
    <div
      className="
        bg-[#0B1730]
        border
        border-white/10
        rounded-3xl
        p-6
        overflow-auto
      "
    >

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Sales Leads
        </h2>

        <p className="text-slate-400 mt-2">
          Registered users who have not
          applied yet.
        </p>

      </div>

      <table className="w-full min-w-[700px]">

        <thead>

          <tr className="border-b border-white/10 text-left text-slate-400">

            <th className="pb-4">
              Name
            </th>

            <th className="pb-4">
              Email
            </th>

            <th className="pb-4">
              Registered
            </th>

            <th className="pb-4">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b border-white/5"
            >

              <td className="py-5">
                {lead.name}
              </td>

              <td>
                {lead.email}
              </td>

              <td>
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    bg-cyan-400/10
                    text-cyan-400
                  "
                >
                  LEAD
                </span>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}