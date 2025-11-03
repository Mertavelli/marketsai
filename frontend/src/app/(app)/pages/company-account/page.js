'use client'
import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/app/stores/useAuthStore"
import Input from "@/app/components/Input";
import { useUpdateUser } from "@/app/hooks/user";
import Multiselect from "@/app/components/Multiselect";
import Singleselect from "@/app/components/SingleSelect";
import { toast } from "sonner"
import { FiUpload } from "react-icons/fi";
import ProfileImageUpload from "@/app/components/ProfileImageUpload";
import PitchdeckUpload from "@/app/components/PitchdeckUpload";
import DeepReportDocument from "@/app/(pdf)/reports/page";
import { useCreateAnalysis } from "@/app/hooks/api";
import EmptyReportPlaceholder from "@/app/components/EmptyReportPlaceholder";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import { PiStarFourFill } from "react-icons/pi";
import { BiSave } from "react-icons/bi";
import { BsStars } from "react-icons/bs";

export default function CompanyAccount() {
    const { user } = useAuthStore() || {};
    const { mutate: createMarketAnalysis, isPending: isPendingAnalysis, error: errorAnalysis, data: analysisData } = useCreateAnalysis();
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
        if (analysisData) {
            setMetrics(analysisData);
            toast.success("Investment Memo successfully generated.");
        }
    }, [analysisData]);

    const industries = [
        "Artificial Intelligence",
        "FinTech",
        "HealthTech",
        "EdTech",
        "E-Commerce",
        "SaaS",
        "GreenTech",
        "Mobility",
        "Logistics",
        "Cybersecurity",
        "Gaming",
        "SpaceTech",
        "Robotics",
        "Biotech",
        "LegalTech",
        "InsurTech",
        "AgriTech",
        "PropTech",
        "Media & Entertainment",
        "Human Resources",
        "Travel & Hospitality",
        "Blockchain / Web3",
        "Energy",
        "Consumer Products",
        "Food & Beverage",
        "Manufacturing / Industry 4.0",
        "Social Impact / Nonprofit",
        "Marketplace",
        "Augmented / Virtual Reality",
        "Analytics / Big Data"
    ];

    const employees = [
        "1 – 5",
        "6 – 10",
        "11 – 20",
        "21 – 50",
        "51 – 100",
        "101 – 250",
        "251 – 500",
        "501 – 1000",
        "1000 +"
    ];


    const {
        mutate: updateUser,
        isPending,
        error
    } = useUpdateUser();
    const [initialValues, setInitialValues] = useState(null);


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [slogan, setSlogan] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const [selectedIndustries, setSelectedIndustries] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState("")
    const [pitchdeckFile, setPitchdeckFile] = useState(null);
    const handlePitchdeckUpload = async (file) => {
        setPitchdeckFile(file);
        // Upload & Backend-Call kannst du hier oder später auslösen
    };
    useEffect(() => {
        if (user) {
            const init = {
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                company: user.company || "",
                position: user.position || "",
                description: user.description || "",
                slogan: user.slogan || "",
                website: user.website || "",
                location: user.location || "",
                industries: user.industries || [],
                employees: user.employees || "",
            };

            setFirstName(init.firstName);
            setLastName(init.lastName);
            setCompany(init.company);
            setPosition(init.position);
            setDescription(init.description);
            setSlogan(init.slogan);
            setWebsite(init.website);
            setLocation(init.location);
            setSelectedIndustries(init.industries);
            setSelectedEmployees(init.employees);
            setInitialValues(init);
        }
    }, [user]);

    const isChanged = initialValues && (
        firstName !== initialValues.firstName ||
        lastName !== initialValues.lastName ||
        company !== initialValues.company ||
        position !== initialValues.position ||
        description !== initialValues.description ||
        slogan !== initialValues.slogan ||
        website !== initialValues.website ||
        location !== initialValues.location ||
        selectedEmployees !== initialValues.employees ||
        JSON.stringify(selectedIndustries) !== JSON.stringify(initialValues.industries)
    );


    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!company.trim()) newErrors.company = "Company name is required.";
        if (!position.trim()) newErrors.position = "Position is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;
        if (!user?._id) return console.warn("User-ID nicht verfügbar!");
        updateUser({
            firstName, lastName, company, position, description,
            slogan, website, location, industries: selectedIndustries,
            employees: selectedEmployees
        });
        toast("Your changes have been saved.");
    };

    const handleTogglePublish = () => {
        if (!validateForm()) return;
        if (!user?._id) return console.warn("User-ID nicht verfügbar!");

        const newStatus = !user.published;
        updateUser({
            firstName, lastName, company, position, description,
            slogan, website, location, industries: selectedIndustries,
            employees: selectedEmployees,
            published: newStatus
        });

        toast(newStatus ? "Your profile is now public." : "Your profile is now private.");
    };

    const handleAnalyze = () => {
        if (!validateForm()) return;
        if (!user?._id) return console.warn("User-ID nicht verfügbar!");

        toast("Your changes have been saved.");
    };



    return (
        <div className="w-full max-w-[91rem] flex flex-col gap-5">
            <h1 className="heading">Edit Profile</h1>

            <div className="flex items-center justify-end gap-1">
                <button onClick={handleAnalyze} disabled={!analysisData} className={`font-medium text-sm transition-all p-1.5 rounded-md flex justify-between items-center gap-2 ${analysisData ? "bg-accent hover:bg-accent/90 cursor-pointer text-white" : "bg-secondary text-black cursor-not-allowed"}`}>
                    Analyze
                    <BsStars className={analysisData ? "text-white" : "text-black"} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center border border-border rounded-md p-4 w-full">

                    <ProfileImageUpload user={user} />

                    <div
                        className="grid grid-cols-2 gap-4 mt-8 w-full">
                        <Input
                            type="text"
                            placeholder="Enter your first name"
                            label="First name"
                            value={firstName || ""}
                            setValue={setFirstName}
                            error={errors.firstName}
                        />

                        <Input
                            type="text"
                            placeholder="Enter your last name"
                            label="Last name"
                            value={lastName || ""}
                            setValue={setLastName}
                            error={errors.lastName}
                        />

                        <Input
                            type="text"
                            placeholder="Enter your company name"
                            label="Company"
                            value={company || ""}
                            setValue={setCompany}
                            error={errors.company}
                        />

                        <Input
                            type="text"
                            placeholder="Enter your job title"
                            label="Position"
                            value={position || ""}
                            setValue={setPosition}
                            error={errors.position}
                        />

                        <Input
                            type="text"
                            placeholder="Enter your website"
                            label="Website"
                            value={website || ""}
                            setValue={setWebsite}
                            required={false}
                        />

                        <Input
                            type="text"
                            placeholder="Enter your location"
                            label="Location"
                            value={location || ""}
                            setValue={setLocation}
                            required={false}
                        />

                        <div className="flex flex-col gap-2 text-black w-full">
                            <label>Industries</label>
                            <Multiselect defaultSelection={user.industries} options={industries} onChange={(selected) => setSelectedIndustries(selected)} />
                        </div>

                        <div className="flex flex-col gap-2 text-black w-full">
                            <label>Employees</label>
                            <Singleselect defaultSelection={user.employees} options={employees} onChange={(selected) => setSelectedEmployees(selected)} />
                        </div>


                        <div className="flex flex-col gap-2 text-black w-full col-span-2">
                            <label>Slogan</label>
                            <textarea
                                className="w-full border rounded-md p-3 border-border"
                                placeholder="Enter your company slogan"
                                value={slogan || ""}
                                onChange={(e) => setSlogan(e.target.value)}
                            ></textarea>
                        </div>


                        <div className="flex flex-col gap-2 text-black w-full col-span-2">
                            <label>Description</label>
                            <textarea
                                className="w-full border rounded-md p-3 border-border"
                                placeholder="Write a short description about your company"
                                value={description || ""}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="col-span-2">
                            <PitchdeckUpload
                                existingUrl={user?.pitchdeck}
                                onUploadUrl={(url) => {
                                    updateUser({ pitchdeck: url });
                                }}
                            />

                        </div>

                        <button
                            className={`py-3 text-center rounded-md text-white transition-all ${isChanged ? "bg-accent hover:bg-accent/90 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            onClick={handleSave}
                            disabled={!isChanged}
                        >
                            Save
                        </button>

                        <button
                            className={`py-3 text-center rounded-md border-2 transition-all cursor-pointer ${user.published
                                ? "border-red-500 text-red-500 hover:bg-red-50"
                                : "bg-accent hover:bg-accent/90 text-white"
                                }`}
                            onClick={handleTogglePublish}
                        >
                            {user.published ? "Make Private" : "Publish"}
                        </button>



                        {error && <p className="text-red-500 text-center">{error.message}</p>}

                    </div>

                </div>
                <div className="flex-[0.6] h-full overflow-hidden">
                    {!analysisData && !isPendingAnalysis && <EmptyReportPlaceholder />}
                    {isPendingAnalysis && <SkeletonLoader />}
                    {analysisData && <div className="h-full border border-border rounded-xl overflow-y-auto"><DeepReportDocument metrics={metrics} setMetrics={setMetrics} /></div>}
                </div>



            </div>

        </div>
    )
}