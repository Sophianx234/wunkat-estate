"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const tenancyTerms = [
  {
    title: "1. Tenancy Details",
    points: [
      "The tenancy period shall be one (1) year from the commencement date of this agreement.",
      "The rent shall be GHC ( ) per month, totaling GHC ( ) for the tenancy period.",
      "Rent must be paid in cash or through the bank, clear of all deductions, whether formally demanded or not.",
      "A deposit of one (1) month rent is required and refundable upon expiration of the tenancy, subject to deductions for damages. Where no deposit is paid, the tenancy shall end one month earlier.",
      "The Tenant shall occupy the premises solely as a private residence and shall not use it for illegal or immoral purposes.",
      "The Landlord may increase rent with at least three (3) months’ notice.",
      "The Landlord may inspect the property every six (6) months.",
    ],
  },
  {
    title: "2. Tenant’s Obligations",
    points: [
      "The Tenant shall pay all utility charges (water, electricity, etc.).",
      "Water from the borehole may be used at a monthly rate of GHC ( ), for domestic purposes only.",
      "Tenants shall contribute GHC ( ) monthly for cleaning the compound. This is compulsory.",
      "The Tenant shall maintain the property in good condition and return it as received, except for fair wear and tear.",
      "The Tenant shall not alter, paint, or affix items without the Landlord’s consent.",
      "The Tenant shall not sub-let, take lodgers, or assign tenancy without permission.",
      "The Tenant shall not keep pets without consent.",
      "The Tenant shall not engage in nuisance, harassment, abuse, or cause noise disturbance.",
      "The Tenant shall not duplicate or change locks without consent.",
      "Designated areas must be used for pounding food, drying clothes, and cooking (not in verandas/porches).",
      "At the end of tenancy, the Tenant shall return all keys and remove belongings. Unremoved items may be disposed of by the Landlord.",
    ],
  },
  {
    title: "3. Landlord’s Obligations",
    points: [
      "The Landlord shall ensure the Tenant’s peaceful occupation upon rent payment and compliance.",
      "The property shall be delivered in a clean, habitable condition with all fixtures in good order.",
      "The Landlord shall repair and maintain the structure, except where damage is caused by the Tenant.",
    ],
  },
  {
    title: "4. Damage & Repairs",
    points: [
      "The Tenant shall be liable for damages caused by negligence or misuse.",
      "The Tenant shall not discharge harmful substances into drains.",
      "The Tenant shall maintain the interior, including windows, in clean condition.",
    ],
  },
  {
    title: "5. Forfeiture & Termination",
    points: [
      "If rent is unpaid for 14 days after due date, the Landlord may enforce forfeiture.",
      "If either party materially breaches this agreement, the other may terminate the tenancy.",
      "Termination by Tenant requires at least three (3) months’ notice.",
      "If Tenant terminates early: i) May retain possession until tenancy expires, OR ii) With consent, provide a replacement tenant, OR iii) Allow Landlord to rent out unit and refund balance (if replacement found).",
      "If no replacement is found, Landlord is not obliged to refund rent.",
      "If Tenant engages in illegal activities, tenancy is terminated immediately, and Tenant shall bear rectification costs.",
    ],
  },
];

type TenancyTermsModalProps = {
  open:boolean;
  setOpen: (open: boolean) => void;
  handlePay: () => void;
};

export default function TenancyTermsModal({open,setOpen,handlePay}:TenancyTermsModalProps) {
  const [accepted, setAccepted] = useState(false);

  return (
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h1 className="text-xl font-semibold text-gray-900">
                  Tenancy Agreement
                </h1>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <ScrollArea className="h-96 px-6 py-4">
                <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
                  {tenancyTerms.map((section, idx) => (
                    <section key={idx}>
                      <h2 className="font-semibold text-gray-900 text-lg mb-2">
                        {section.title}
                      </h2>
                      <ul className="list-disc pl-5 space-y-2">
                        {section.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="px-6 py-4 border-t space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="accept"
                    checked={accepted}
                    onCheckedChange={(val) => setAccepted(Boolean(val))}
                  />
                  <label
                    htmlFor="accept"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I have read and agree to the tenancy terms
                  </label>
                </div>
                <Button
                  className="w-full rounded-xl"
                  disabled={!accepted}
                  onClick={() => {
                    setOpen(false);
                    setAccepted(false);
                    handlePay();
                  }}
                >
                  Accept & Continue
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
  );
}
