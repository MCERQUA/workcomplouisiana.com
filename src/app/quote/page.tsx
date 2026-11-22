"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";
import { US_STATES, QUOTE_SERVICE_TYPES, YEARS_OPTIONS, COPY } from "@/lib/content";
import { CheckCircle2, ShieldCheck, ArrowRight, Phone, Clock, Zap, MapPin } from "lucide-react";
import { OwnersFieldset } from "@/components/forms/OwnersFieldset";


const STATE_CODES = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const ENTITY_TYPES = ["Sole proprietor", "Partnership", "Limited liability company", "Corporation", "Subchapter S corporation", "Joint venture", "Trust", "Unincorporated association", "Other"];
const EL_LIMITS = ["100,000", "500,000", "1,000,000"];
// ACORD 130 intake fields (all optional, posted under the names the workers comp mapper reads). Blank radio answers are never sent as "No".
const ACORD_BLANK: Record<string, string> = Object.fromEntries(["dba", "entityType", "entityTypeOther", "fein", "desiredEffectiveDate", "desiredExpirationDate", "experienceMod", "ncciRiskId", "sicCode", "naicsCode", "businessWebsite", "secondaryPhone", "physicalCounty", "mailingSameAsPhysical", "mailingAddress", "mailingCity", "mailingState", "mailingZip", "inspectionContactName", "inspectionContactPhone", "accountingContactName", "accountingContactPhone", "claimContactName", "claimContactPhone", "fullTimeEmployees", "partTimeEmployees", "workStates", "elEachAccident", "elDiseasePolicy", "elDiseaseEachEmployee", "priorPremium", "priorExperienceMod", "priorYear1Year", "lossCount", "lossAmountPaid", "lossAmountReserved", "workFromHomeCount", "travelStates", "wcCoverageOtherDescription", "wcDeductibleOtherDescription", "classDuties1", "classFullTime1", "classPartTime1", "classPayroll1", "classDuties2", "classFullTime2", "classPartTime2", "classPayroll2", "classDuties3", "classFullTime3", "classPartTime3", "classPayroll3", "classDuties4", "classFullTime4", "classPartTime4", "classPayroll4", "classDuties5", "classFullTime5", "classPartTime5", "classPayroll5", "priorYear2Year", "priorYear2Carrier", "priorYear2Premium", "priorYear2Mod", "priorYear2ClaimCount", "priorYear2Paid", "priorYear2Reserved", "priorYear3Year", "priorYear3Carrier", "priorYear3Premium", "priorYear3Mod", "priorYear3ClaimCount", "priorYear3Paid", "priorYear3Reserved", "priorYear4Year", "priorYear4Carrier", "priorYear4Premium", "priorYear4Mod", "priorYear4ClaimCount", "priorYear4Paid", "priorYear4Reserved", "priorYear5Year", "priorYear5Carrier", "priorYear5Premium", "priorYear5Mod", "priorYear5ClaimCount", "priorYear5Paid", "priorYear5Reserved", "yn_foreignCoverage", "yn_voluntaryComp", "yn_uslh", "yn_usesSubcontractors", "ynExplain_usesSubcontractors", "yn_aircraftWatercraft", "ynExplain_aircraftWatercraft", "yn_hazardousMaterial", "ynExplain_hazardousMaterial", "yn_undergroundOrHeights", "ynExplain_undergroundOrHeights", "yn_overWaterWork", "ynExplain_overWaterWork", "yn_otherBusiness", "ynExplain_otherBusiness", "yn_subletWithoutCOI", "ynExplain_subletWithoutCOI", "yn_safetyProgram", "ynExplain_safetyProgram", "yn_groupTransportation", "ynExplain_groupTransportation", "yn_minorsOrSeniors", "ynExplain_minorsOrSeniors", "yn_seasonalEmployees", "ynExplain_seasonalEmployees", "yn_volunteerLabor", "ynExplain_volunteerLabor", "yn_physicalHandicaps", "ynExplain_physicalHandicaps", "yn_outOfStateTravel", "ynExplain_outOfStateTravel", "yn_athleticTeams", "ynExplain_athleticTeams", "yn_physicalsRequired", "ynExplain_physicalsRequired", "yn_declinedCancelled", "ynExplain_declinedCancelled", "yn_otherInsuranceWithCarrier", "ynExplain_otherInsuranceWithCarrier", "yn_employeeHealthPlan", "ynExplain_employeeHealthPlan", "yn_employeesOtherBusinesses", "ynExplain_employeesOtherBusinesses", "yn_leasedEmployees", "ynExplain_leasedEmployees", "yn_workFromHome", "ynExplain_workFromHome", "yn_taxLiensBankruptcy", "ynExplain_taxLiensBankruptcy", "yn_unpaidWCPremium", "ynExplain_unpaidWCPremium", "yn_lossRunsAttached", "wcCoverageManagedCare", "wcCoverageOther", "wcDeductibleMedical", "wcDeductibleIndemnity", "wcDeductibleOther"].map((k) => [k, ""]));

const trustItems = [
  { icon: ShieldCheck, title: COPY.quote.trustNicheTitle, desc: COPY.quote.trustNicheDesc },
  { icon: Zap, title: "~15-minute quotes", desc: "Real quotes from real markets, fast." },
  { icon: Clock, title: "2-hour claims response", desc: "When a loss hits, you reach a person." },
  { icon: MapPin, title: "All 50 states", desc: "Licensed nationwide — NPN #8608479." },
];

export default function QuotePage() {
  const [ownerFields, setOwnerFields] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "", businessName: "", email: "", phone: "", state: "", serviceType: "", yearsInBusiness: "", message: "", "bot-field": "",
    streetAddress: "", city: "", zip: "", priorYearGrossSales: "", priorYearSubcontractorExpenses: "", priorYearEmployeeCount: "", priorYearEmployeePayroll: "", estimatedGrossSales: "", estimatedSubcontractorExpenses: "", estimatedEmployeeCount: "", estimatedEmployeePayroll: "", estimatedMaterialCosts: "", subcontractorsHaveInsurance: "", percentSubcontractorsInsured: "", coverageForUninsuredSubcontractors: "", annualGrossSales: "", yearBusinessStarted: "", businessDescription: "", classCode1: "", classCode2: "", classCode3: "", classCode4: "", classCode5: "", residentialVsCommercial: "", newVsExistingConstruction: "", largestProjects: "", priorCarrierName: "", priorPolicyExpiration: "", ownerNames: "", ownerDateOfBirth: "", ownerOwnershipPct: "", numberOfEmployees: "", amountOfPayroll: "", hasClericalStaff: "", clericalStaffCount: "", hasSalesStaff: "", salesStaffCount: "", officeVsFieldSplit: "", ...ACORD_BLANK,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData["bot-field"]) return;
    setSubmitting(true);
    setError("");
    try {
      await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(Object.fromEntries(Object.entries({ "form-name": "quote", ...formData, ...ownerFields } as Record<string, string>).filter(([k, v]) => v !== "" || !/^(yn_|ynExplain_|wcCoverage|wcDeductible|mailingSameAsPhysical)/.test(k)))).toString() });
      setSubmitted(true);
    } catch {
      setError(COPY.quote.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-adobe bg-cream/50 text-espresso placeholder-mocha/60 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all text-sm";
  const labelClass = "block text-sm font-heading font-semibold text-espresso mb-1.5";

  const set = (k: string, v: string) => setFormData((prev) => ({ ...prev, [k]: v }));
  const fv = (k: string) => formData[k] || "";
  const txt = (name: string, label: string, placeholder = "", type = "text", maxLength?: number) => (
    <div key={name}><label htmlFor={name} className={labelClass}>{label}</label><input id={name} name={name} type={type} maxLength={maxLength} value={fv(name)} onChange={handleChange} placeholder={placeholder} className={inputClass} /></div>
  );
  const area = (name: string, label: string, placeholder = "") => (
    <div key={name}><label htmlFor={name} className={labelClass}>{label}</label><textarea id={name} name={name} rows={2} value={fv(name)} onChange={handleChange} placeholder={placeholder} className={`${inputClass} resize-none`} /></div>
  );
  const sel = (name: string, label: string, options: string[], placeholder = "Select…") => (
    <div key={name}><label htmlFor={name} className={labelClass}>{label}</label><select id={name} name={name} value={fv(name)} onChange={handleChange} className={inputClass}><option value="">{placeholder}</option>{options.map((o) => (<option key={o} value={o}>{o}</option>))}</select></div>
  );
  const yn = (name: string, label: string) => (
    <fieldset key={name}>
      <legend className={labelClass}>{label}</legend>
      <div className="flex gap-6">
        {["Yes", "No"].map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm text-espresso"><input type="radio" name={name} value={o} checked={fv(name) === o} onChange={() => set(name, o)} />{o}</label>
        ))}
      </div>
    </fieldset>
  );
  const sectionHead = (title: string, note: string) => (
    <div>
      <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-mocha/70 mt-0.5">{note}</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-warm-radial pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container-wide">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <span className="pill-clay"><ShieldCheck className="h-3.5 w-3.5" /> Free quote</span>
              <h1 className="mt-5 font-heading font-extrabold text-espresso text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                {COPY.quote.h1Lead}{" "}
                <span className="bg-gradient-to-r from-clay via-clay-light to-gold-dark bg-clip-text text-transparent">{COPY.quote.h1Highlight}</span>
              </h1>
              <p className="mt-5 lead">{COPY.quote.lead}</p>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                {trustItems.map((item) => (
                  <FadeIn key={item.title}>
                    <div className="flex gap-3 p-5 rounded-2xl bg-white border border-adobe shadow-card">
                      <span className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-clay/10 text-clay"><item.icon className="h-5 w-5" strokeWidth={2.2} /></span>
                      <div>
                        <p className="font-heading font-bold text-espresso text-sm">{item.title}</p>
                        <p className="text-mocha text-xs leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
                <FadeIn>
                  <div className="p-5 rounded-2xl bg-espresso text-cream text-center">
                    <p className="text-xs font-heading font-bold uppercase tracking-wider text-gold mb-2">Prefer to call?</p>
                    <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 text-cream font-heading font-extrabold text-xl hover:text-gold-light transition-colors"><Phone className="h-5 w-5" />{SITE.phone}</a>
                    <p className="text-xs text-cream/60 mt-1">{SITE.hours}</p>
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-2">
                {submitted ? (
                  <FadeIn>
                    <div className="p-10 md:p-12 rounded-3xl bg-white border border-adobe shadow-card text-center">
                      <div className="w-16 h-16 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="h-8 w-8 text-sage" /></div>
                      <h2 className="font-heading font-extrabold text-espresso text-2xl mb-3">Quote request received</h2>
                      <p className="text-mocha mb-2">Thank you! We'll review your operation and reach out within one business day with personalized quotes.</p>
                      <p className="text-sm text-mocha">Need it sooner? Call <a href={SITE.phoneHref} className="text-clay font-heading font-semibold">{SITE.phone}</a>.</p>
                      <Link href="/" className="btn-secondary mt-6 inline-flex">Back to home</Link>
                    </div>
                  </FadeIn>
                ) : (
                  <FadeIn>
                    <form name="quote" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="rounded-3xl bg-white border border-adobe shadow-card p-7 md:p-9 space-y-5">
                      <input type="hidden" name="form-name" value="quote" />
                      <input name="bot-field" type="hidden" value={formData["bot-field"]} onChange={handleChange} className="hidden" />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="name" className={labelClass}>Full name *</label><input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} /></div>
                        <div><label htmlFor="businessName" className={labelClass}>Business name *</label><input id="businessName" name="businessName" type="text" required value={formData.businessName} onChange={handleChange} placeholder={COPY.quote.businessPlaceholder} className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="email" className={labelClass}>Email *</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={COPY.quote.emailPlaceholder} className={inputClass} /></div>
                        <div><label htmlFor="phone" className={labelClass}>Phone *</label><input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder={COPY.quote.phonePlaceholder} className={inputClass} /></div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label htmlFor="state" className={labelClass}>Primary state *</label>
                          <select id="state" name="state" required value={formData.state} onChange={handleChange} className={inputClass}><option value="">Select a state…</option>{US_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
                        </div>
                        <div><label htmlFor="yearsInBusiness" className={labelClass}>Years in business</label>
                          <select id="yearsInBusiness" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} className={inputClass}><option value="">Select…</option>{YEARS_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}</select>
                        </div>
                      </div>

                      <div><label htmlFor="serviceType" className={labelClass}>What do you need? *</label>
                        <select id="serviceType" name="serviceType" required value={formData.serviceType} onChange={handleChange} className={inputClass}><option value="">Select coverage…</option>{QUOTE_SERVICE_TYPES.map((s) => (<option key={s} value={s}>{s}</option>))}</select>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Business details</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">What the business does and how long it has been running.</p>
                        </div>
                        <div><label htmlFor="yearBusinessStarted" className={labelClass}>Year business started</label><input id="yearBusinessStarted" name="yearBusinessStarted" type="text" inputMode="numeric" value={formData.yearBusinessStarted} onChange={handleChange} placeholder="2015" className={inputClass} /></div>
                        <div><label htmlFor="businessDescription" className={labelClass}>Description of the business</label><textarea id="businessDescription" name="businessDescription" rows={3} maxLength={142} value={formData.businessDescription} onChange={handleChange} placeholder="What the business does, day to day" className={`${inputClass} resize-none`} /></div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="annualGrossSales" className={labelClass}>Annual gross sales</label><input id="annualGrossSales" name="annualGrossSales" type="text" inputMode="numeric" value={formData.annualGrossSales} onChange={handleChange} placeholder="$1,200,000" className={inputClass} /></div>
                          <div><label htmlFor="residentialVsCommercial" className={labelClass}>Residential vs commercial split</label><input id="residentialVsCommercial" name="residentialVsCommercial" type="text" value={formData.residentialVsCommercial} onChange={handleChange} placeholder="70% residential / 30% commercial" className={inputClass} /></div>
                        </div>
                        <div><label htmlFor="newVsExistingConstruction" className={labelClass}>New vs existing construction</label><input id="newVsExistingConstruction" name="newVsExistingConstruction" type="text" value={formData.newVsExistingConstruction} onChange={handleChange} placeholder="Mostly existing structures" className={inputClass} /></div>
                        <div><label htmlFor="largestProjects" className={labelClass}>Largest projects</label><textarea id="largestProjects" name="largestProjects" rows={3} value={formData.largestProjects} onChange={handleChange} placeholder="Three largest jobs in the last year — value and scope" className={`${inputClass} resize-none`} /></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        {sectionHead("Business identification", "Optional. Helps us prepare your application faster. Never enter a Social Security number anywhere on this form.")}
                        {txt("dba", "Doing business as (DBA), if different", "Trade name")}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {sel("entityType", "Entity type", ENTITY_TYPES)}
                          {fv("entityType") === "Other" && txt("entityTypeOther", "Entity type, other", "Describe")}
                        </div>
                        {txt("fein", "Business FEIN (9 digits; leave blank for a new venture)", "12-3456789")}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("desiredEffectiveDate", "Desired policy effective date", "", "date")}
                          {txt("desiredExpirationDate", "Desired policy expiration date (optional)", "", "date")}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("experienceMod", "Experience mod, if you know it", "1.00")}
                          {txt("ncciRiskId", "NCCI risk ID or state rating bureau number (if you have one)")}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("sicCode", "SIC code (if known)")}
                          {txt("naicsCode", "NAICS code (if known)")}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("businessWebsite", "Business website", "https://")}
                          {txt("secondaryPhone", "Secondary phone", "", "tel")}
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Business address</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">Where your operation is based.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="streetAddress" className={labelClass}>Street address</label><input id="streetAddress" name="streetAddress" type="text" value={formData.streetAddress} onChange={handleChange} placeholder="123 Main St, Suite 200" className={inputClass} /></div>
                          <div><label htmlFor="city" className={labelClass}>City</label><input id="city" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Phoenix" className={inputClass} /></div>
                        </div>
                        <div><label htmlFor="zip" className={labelClass}>ZIP code</label><input id="zip" name="zip" type="text" value={formData.zip} onChange={handleChange} placeholder="85001" className={inputClass} /></div>
                        {txt("physicalCounty", "County", "Caddo Parish")}
                        {yn("mailingSameAsPhysical", "Is your mailing address the same as this address?")}
                        {fv("mailingSameAsPhysical") === "No" && (
                          <>
                            {txt("mailingAddress", "Mailing address", "PO Box 100")}
                            <div className="grid sm:grid-cols-3 gap-4">
                              {txt("mailingCity", "Mailing city")}
                              {sel("mailingState", "Mailing state", STATE_CODES, "State")}
                              {txt("mailingZip", "Mailing ZIP")}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        {sectionHead("Contacts", "Optional. Helps the carrier reach the right person.")}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("inspectionContactName", "Contact for premises inspection")}
                          {txt("inspectionContactPhone", "Inspection contact phone", "", "tel")}
                          {txt("accountingContactName", "Billing / audit contact")}
                          {txt("accountingContactPhone", "Billing / audit contact phone", "", "tel")}
                          {txt("claimContactName", "Claims contact")}
                          {txt("claimContactPhone", "Claims contact phone", "", "tel")}
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Payroll and class codes</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">Employees, payroll and how the work is classified.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="numberOfEmployees" className={labelClass}>Number of employees</label><input id="numberOfEmployees" name="numberOfEmployees" type="text" inputMode="numeric" value={formData.numberOfEmployees} onChange={handleChange} placeholder="8" className={inputClass} /></div>
                          <div><label htmlFor="amountOfPayroll" className={labelClass}>Amount of payroll</label><input id="amountOfPayroll" name="amountOfPayroll" type="text" inputMode="numeric" value={formData.amountOfPayroll} onChange={handleChange} placeholder="$420,000" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="classCode1" className={labelClass}>Class code 1</label><input id="classCode1" name="classCode1" type="text" value={formData.classCode1} onChange={handleChange} placeholder="5403" className={inputClass} /></div>
                          <div><label htmlFor="classCode2" className={labelClass}>Class code 2</label><input id="classCode2" name="classCode2" type="text" value={formData.classCode2} onChange={handleChange} placeholder="5645" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="classCode3" className={labelClass}>Class code 3</label><input id="classCode3" name="classCode3" type="text" value={formData.classCode3} onChange={handleChange} className={inputClass} /></div>
                          <div><label htmlFor="classCode4" className={labelClass}>Class code 4</label><input id="classCode4" name="classCode4" type="text" value={formData.classCode4} onChange={handleChange} className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="classCode5" className={labelClass}>Class code 5</label><input id="classCode5" name="classCode5" type="text" value={formData.classCode5} onChange={handleChange} className={inputClass} /></div>
                          <div><label htmlFor="officeVsFieldSplit" className={labelClass}>Office vs field split</label><input id="officeVsFieldSplit" name="officeVsFieldSplit" type="text" value={formData.officeVsFieldSplit} onChange={handleChange} placeholder="2 office / 6 field" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="hasClericalStaff" className={labelClass}>Any clerical staff?</label><select id="hasClericalStaff" name="hasClericalStaff" value={formData.hasClericalStaff} onChange={handleChange} className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                          <div><label htmlFor="clericalStaffCount" className={labelClass}>Clerical staff — count and payroll</label><input id="clericalStaffCount" name="clericalStaffCount" type="text" value={formData.clericalStaffCount} onChange={handleChange} placeholder="2 clerical, $90,000 payroll" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="hasSalesStaff" className={labelClass}>Any outside sales staff?</label><select id="hasSalesStaff" name="hasSalesStaff" value={formData.hasSalesStaff} onChange={handleChange} className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                          <div><label htmlFor="salesStaffCount" className={labelClass}>Sales staff — count and payroll</label><input id="salesStaffCount" name="salesStaffCount" type="text" value={formData.salesStaffCount} onChange={handleChange} placeholder="1 outside sales, $60,000 payroll" className={inputClass} /></div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        {sectionHead("Class code detail and liability limits", "Optional. For each class code above: what the crew does, how many work in it and its annual payroll.")}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("fullTimeEmployees", "Full-time employees", "6")}
                          {txt("partTimeEmployees", "Part-time employees", "2")}
                        </div>
                        {txt("workStates", "State(s) where your employees work", "LA")}
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className="space-y-3 rounded-2xl border border-adobe p-4">
                            <p className="text-sm font-heading font-semibold text-espresso">Class code {n}{fv(`classCode${n}`) ? ` (${fv(`classCode${n}`)})` : ""}</p>
                            {txt(`classDuties${n}`, "Duties for this class", "What these employees do")}
                            <div className="grid sm:grid-cols-3 gap-4">
                              {txt(`classFullTime${n}`, "Full-time", "", "text")}
                              {txt(`classPartTime${n}`, "Part-time", "", "text")}
                              {txt(`classPayroll${n}`, "Annual payroll ($)", "", "text")}
                            </div>
                          </div>
                        ))}
                        <div className="grid sm:grid-cols-3 gap-4">
                          {sel("elEachAccident", "Employers liability: each accident", EL_LIMITS)}
                          {sel("elDiseasePolicy", "Employers liability: disease, policy limit", EL_LIMITS)}
                          {sel("elDiseaseEachEmployee", "Employers liability: disease, each employee", EL_LIMITS)}
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Prior year</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">Your last completed 12 months. Best estimates are fine.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="priorYearGrossSales" className={labelClass}>Prior year gross sales</label><input id="priorYearGrossSales" name="priorYearGrossSales" type="text" inputMode="numeric" value={formData.priorYearGrossSales} onChange={handleChange} placeholder="$1,200,000" className={inputClass} /></div>
                          <div><label htmlFor="priorYearSubcontractorExpenses" className={labelClass}>Prior year subcontractor expenses</label><input id="priorYearSubcontractorExpenses" name="priorYearSubcontractorExpenses" type="text" inputMode="numeric" value={formData.priorYearSubcontractorExpenses} onChange={handleChange} placeholder="$250,000" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="priorYearEmployeeCount" className={labelClass}>Prior year employee count</label><input id="priorYearEmployeeCount" name="priorYearEmployeeCount" type="text" inputMode="numeric" value={formData.priorYearEmployeeCount} onChange={handleChange} placeholder="8" className={inputClass} /></div>
                          <div><label htmlFor="priorYearEmployeePayroll" className={labelClass}>Prior year employee payroll</label><input id="priorYearEmployeePayroll" name="priorYearEmployeePayroll" type="text" inputMode="numeric" value={formData.priorYearEmployeePayroll} onChange={handleChange} placeholder="$400,000" className={inputClass} /></div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Next twelve months — estimates</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">Projected figures for the coming policy period.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="estimatedGrossSales" className={labelClass}>Estimated gross sales</label><input id="estimatedGrossSales" name="estimatedGrossSales" type="text" inputMode="numeric" value={formData.estimatedGrossSales} onChange={handleChange} placeholder="$1,400,000" className={inputClass} /></div>
                          <div><label htmlFor="estimatedSubcontractorExpenses" className={labelClass}>Estimated subcontractor expenses</label><input id="estimatedSubcontractorExpenses" name="estimatedSubcontractorExpenses" type="text" inputMode="numeric" value={formData.estimatedSubcontractorExpenses} onChange={handleChange} placeholder="$300,000" className={inputClass} /></div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="estimatedEmployeeCount" className={labelClass}>Estimated employee count</label><input id="estimatedEmployeeCount" name="estimatedEmployeeCount" type="text" inputMode="numeric" value={formData.estimatedEmployeeCount} onChange={handleChange} placeholder="10" className={inputClass} /></div>
                          <div><label htmlFor="estimatedEmployeePayroll" className={labelClass}>Estimated employee payroll</label><input id="estimatedEmployeePayroll" name="estimatedEmployeePayroll" type="text" inputMode="numeric" value={formData.estimatedEmployeePayroll} onChange={handleChange} placeholder="$500,000" className={inputClass} /></div>
                        </div>
                        <div><label htmlFor="estimatedMaterialCosts" className={labelClass}>Estimated material costs</label><input id="estimatedMaterialCosts" name="estimatedMaterialCosts" type="text" inputMode="numeric" value={formData.estimatedMaterialCosts} onChange={handleChange} placeholder="$180,000" className={inputClass} /></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Subcontractor insurance</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">How subcontracted work is covered.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="subcontractorsHaveInsurance" className={labelClass}>Do your subcontractors carry their own insurance?</label><select id="subcontractorsHaveInsurance" name="subcontractorsHaveInsurance" value={formData.subcontractorsHaveInsurance} onChange={handleChange} className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                          <div><label htmlFor="percentSubcontractorsInsured" className={labelClass}>Percentage of subcontractors insured</label><input id="percentSubcontractorsInsured" name="percentSubcontractorsInsured" type="text" inputMode="numeric" value={formData.percentSubcontractorsInsured} onChange={handleChange} placeholder="100" className={inputClass} /></div>
                        </div>
                        <div><label htmlFor="coverageForUninsuredSubcontractors" className={labelClass}>Do you need coverage for uninsured subcontractors?</label><select id="coverageForUninsuredSubcontractors" name="coverageForUninsuredSubcontractors" value={formData.coverageForUninsuredSubcontractors} onChange={handleChange} className={inputClass}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Current or prior coverage</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">Who covers you today, if anyone.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div><label htmlFor="priorCarrierName" className={labelClass}>Current or prior carrier</label><input id="priorCarrierName" name="priorCarrierName" type="text" value={formData.priorCarrierName} onChange={handleChange} placeholder="Carrier name" className={inputClass} /></div>
                        </div>
                        <div><label htmlFor="priorPolicyExpiration" className={labelClass}>Policy expiration date</label><input id="priorPolicyExpiration" name="priorPolicyExpiration" type="date" value={formData.priorPolicyExpiration} onChange={handleChange} className={inputClass} /></div>
                        {txt("priorPremium", "Annual premium on your current or most recent policy ($)", "", "text")}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {txt("priorYear1Year", "Policy year (current or most recent)", "2025", "text", 4)}
                          {txt("priorExperienceMod", "Experience mod on that policy", "0.85")}
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {txt("lossCount", "Number of claims", "0 if none")}
                          {txt("lossAmountPaid", "Amount paid ($)", "0 if none")}
                          {txt("lossAmountReserved", "Amount reserved ($)", "0 if none")}
                        </div>
                        <details className="space-y-4">
                          <summary className="cursor-pointer text-sm font-heading font-semibold text-espresso">Prior policy years 2 to 5 (optional)</summary>
                          <p className="text-xs text-mocha/70 mt-1">Carrier, premium, experience mod and claims for each earlier policy year.</p>
                          {[2, 3, 4, 5].map((n) => (
                            <div key={n} className="space-y-3 rounded-2xl border border-adobe p-4 mt-3">
                              <p className="text-sm font-heading font-semibold text-espresso">Policy year {n}</p>
                              <div className="grid sm:grid-cols-2 gap-4">
                                {txt(`priorYear${n}Year`, "Policy year", "2023", "text", 4)}
                                {txt(`priorYear${n}Carrier`, "Carrier name")}
                                {txt(`priorYear${n}Premium`, "Premium ($)")}
                                {txt(`priorYear${n}Mod`, "Experience mod", "0.85")}
                                {txt(`priorYear${n}ClaimCount`, "Number of claims", "0 if none")}
                                {txt(`priorYear${n}Paid`, "Amount paid ($)", "0 if none")}
                                {txt(`priorYear${n}Reserved`, "Amount reserved ($)", "0 if none")}
                              </div>
                            </div>
                          ))}
                        </details>
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        <div>
                          <h3 className="font-heading font-bold text-espresso text-sm uppercase tracking-wider">Owners and officers</h3>
                          <p className="text-xs text-mocha/70 mt-0.5">Each owner or officer to be included or excluded.</p>
                        </div>
                        <OwnersFieldset
                          inputClass={inputClass}
                          labelClass={labelClass}
                          buttonClass="btn-secondary min-h-[44px]"
                          accentTextClass="text-clay"
                          mutedTextClass="text-mocha"
                          borderClass="border-adobe"
                          onFieldsChange={setOwnerFields}
                        />
                      </div>

                      <div className="space-y-4 pt-5 border-t border-adobe">
                        {sectionHead("Workers' compensation questions", "Optional. Answer Yes or No; add a short explanation for any Yes. An unanswered question is left blank, never treated as No.")}
                        {yn("yn_foreignCoverage", "Do you need Foreign coverage?")}
                        {yn("yn_voluntaryComp", "Do you want Voluntary Compensation coverage?")}
                        {yn("yn_uslh", "Do you need U.S. Longshore and Harbor Workers (USL&H) coverage?")}
                        {yn("yn_usesSubcontractors", "Are subcontractors used?")}
                        {fv("yn_usesSubcontractors") === "Yes" && area("ynExplain_usesSubcontractors", "Please explain (brief)")}
                        {yn("yn_aircraftWatercraft", "Do you own, operate or lease aircraft or watercraft?")}
                        {fv("yn_aircraftWatercraft") === "Yes" && area("ynExplain_aircraftWatercraft", "Please explain (brief)")}
                        {yn("yn_hazardousMaterial", "Do past, present or discontinued operations involve storing, treating, discharging, applying, disposing of or transporting hazardous material?")}
                        {fv("yn_hazardousMaterial") === "Yes" && area("ynExplain_hazardousMaterial", "Please explain (brief)")}
                        {yn("yn_undergroundOrHeights", "Is any work performed underground or above 15 feet?")}
                        {fv("yn_undergroundOrHeights") === "Yes" && area("ynExplain_undergroundOrHeights", "Please explain (brief)")}
                        {yn("yn_overWaterWork", "Is any work performed on barges, vessels, docks or bridges over water?")}
                        {fv("yn_overWaterWork") === "Yes" && area("ynExplain_overWaterWork", "Please explain (brief)")}
                        {yn("yn_otherBusiness", "Are you engaged in any other type of business?")}
                        {fv("yn_otherBusiness") === "Yes" && area("ynExplain_otherBusiness", "Please explain (brief)")}
                        {yn("yn_subletWithoutCOI", "Is any work sublet without certificates of insurance?")}
                        {fv("yn_subletWithoutCOI") === "Yes" && area("ynExplain_subletWithoutCOI", "Please explain (brief)")}
                        {yn("yn_safetyProgram", "Is a written safety program in operation?")}
                        {fv("yn_safetyProgram") === "Yes" && area("ynExplain_safetyProgram", "Please explain (brief)")}
                        {yn("yn_groupTransportation", "Is any group transportation provided?")}
                        {fv("yn_groupTransportation") === "Yes" && area("ynExplain_groupTransportation", "Please explain (brief)")}
                        {yn("yn_minorsOrSeniors", "Any employees under 16 or over 60 years of age?")}
                        {fv("yn_minorsOrSeniors") === "Yes" && area("ynExplain_minorsOrSeniors", "Please explain (brief)")}
                        {yn("yn_seasonalEmployees", "Any seasonal employees?")}
                        {fv("yn_seasonalEmployees") === "Yes" && area("ynExplain_seasonalEmployees", "Please explain (brief)")}
                        {yn("yn_volunteerLabor", "Is there any volunteer or donated labor?")}
                        {fv("yn_volunteerLabor") === "Yes" && area("ynExplain_volunteerLabor", "Please explain (brief)")}
                        {yn("yn_physicalHandicaps", "Any employees with physical handicaps?")}
                        {fv("yn_physicalHandicaps") === "Yes" && area("ynExplain_physicalHandicaps", "Please explain (brief)")}
                        {yn("yn_outOfStateTravel", "Do employees travel out of state?")}
                        {fv("yn_outOfStateTravel") === "Yes" && (<div><label htmlFor="travelStates" className={labelClass}>Which other states do employees travel to or work in? (up to 10 states, two-letter codes) *</label><input id="travelStates" name="travelStates" type="text" required maxLength={40} value={fv("travelStates")} onChange={handleChange} placeholder="TX, MS, AR" className={inputClass} /><p className="mt-1 text-xs text-mocha/70">List up to 10 states here. If more, list the extra states in the explanation box below.</p></div>)}
                        {fv("yn_outOfStateTravel") === "Yes" && area("ynExplain_outOfStateTravel", "Please explain (brief)")}
                        {yn("yn_athleticTeams", "Are athletic teams sponsored?")}
                        {fv("yn_athleticTeams") === "Yes" && area("ynExplain_athleticTeams", "Please explain (brief)")}
                        {yn("yn_physicalsRequired", "Are physicals required after offers of employment are made?")}
                        {fv("yn_physicalsRequired") === "Yes" && area("ynExplain_physicalsRequired", "Please explain (brief)")}
                        {yn("yn_declinedCancelled", "Any policy or coverage declined, cancelled or non-renewed in the last three years?")}
                        {fv("yn_declinedCancelled") === "Yes" && area("ynExplain_declinedCancelled", "Please explain (brief)")}
                        {yn("yn_otherInsuranceWithCarrier", "Any other insurance with this company?")}
                        {fv("yn_otherInsuranceWithCarrier") === "Yes" && area("ynExplain_otherInsuranceWithCarrier", "Please explain (brief)")}
                        {yn("yn_employeeHealthPlan", "Is an employee health plan provided?")}
                        {fv("yn_employeeHealthPlan") === "Yes" && area("ynExplain_employeeHealthPlan", "Please explain (brief)")}
                        {yn("yn_employeesOtherBusinesses", "Do any employees perform work for other businesses or subsidiaries?")}
                        {fv("yn_employeesOtherBusinesses") === "Yes" && area("ynExplain_employeesOtherBusinesses", "Please explain (brief)")}
                        {yn("yn_leasedEmployees", "Do you lease employees to or from other employers?")}
                        {fv("yn_leasedEmployees") === "Yes" && area("ynExplain_leasedEmployees", "Please explain (brief)")}
                        {yn("yn_workFromHome", "Do employees predominantly work from home?")}
                        {fv("yn_workFromHome") === "Yes" && txt("workFromHomeCount", "How many employees work from home?", "3")}
                        {fv("yn_workFromHome") === "Yes" && area("ynExplain_workFromHome", "Please explain (brief)")}
                        {yn("yn_taxLiensBankruptcy", "Any tax liens or bankruptcy within the last five years?")}
                        {fv("yn_taxLiensBankruptcy") === "Yes" && area("ynExplain_taxLiensBankruptcy", "Please explain (brief)")}
                        {yn("yn_unpaidWCPremium", "Any undisputed and unpaid workers compensation premium due from you or any commonly owned or managed business?")}
                        {fv("yn_unpaidWCPremium") === "Yes" && area("ynExplain_unpaidWCPremium", "Please explain (brief)")}
                        {yn("yn_lossRunsAttached", "Will you attach loss runs from your prior carrier?")}
                        {yn("wcCoverageManagedCare", "Do you want the Managed Care Option?")}
                        {yn("wcCoverageOther", "Do you need any other coverage not listed here?")}
                        {fv("wcCoverageOther") === "Yes" && txt("wcCoverageOtherDescription", "Describe (short)", "", "text", 11)}
                        {yn("wcDeductibleMedical", "Do you want a medical deductible?")}
                        {yn("wcDeductibleIndemnity", "Do you want an indemnity deductible?")}
                        {yn("wcDeductibleOther", "Do you want any other type of deductible?")}
                        {fv("wcDeductibleOther") === "Yes" && txt("wcDeductibleOtherDescription", "Describe (short)", "", "text", 13)}
                      </div>

                      <div>
                        <label htmlFor="message" className={labelClass}>Tell us about your operation <span className="text-mocha/60 font-normal">(optional)</span></label>
                        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder={COPY.quote.messagePlaceholder} className={`${inputClass} resize-none`} />
                      </div>

                      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                      <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-clay-gradient text-white font-heading font-bold rounded-full shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                        {submitting ? "Sending…" : "Request my free quote"}{!submitting && <ArrowRight className="h-5 w-5" />}
                      </button>
                      <p className="text-xs text-center text-mocha/70">No spam. No commitment. We'll only contact you about your quote.</p>
                    </form>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
