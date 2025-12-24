import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import {
  Building2,
  Smartphone,
  Server,
  Shield,
  CreditCard,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";

interface SurveyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SurveyData {
  businessInfo: {
    companyName?: string;
    businessStage?: string;
    companySize?: string;
    targetMarket?: string;
    vpnBusinessType?: string;
    email: string;
  };
  applicationDetails: {
    platforms?: string[];
    monthlyActiveUsers?: string;
    expectedGrowthPercent?: string;
    launchTimeline?: string;
    existingProduct?: boolean;
  };
  infrastructure: {
    initialServers?: string;
    regions?: string[];
    bandwidthPerServerMbps?: string;
    autoScaling?: boolean;
    availabilityTier?: string;
  };
  security: {
    vpnProtocols?: string[];
    loggingPolicy?: string;
    customSecurity?: boolean;
    compliance?: string[];
  };
  billing: {
    pricingModel?: string;
    monthlyBudgetUsd?: string;
    analyticsRequired?: boolean;
    billingIntegration?: boolean;
    supportLevel?: string;
  };
  futurePlans: {
    whiteLabel?: boolean;
    multiRegionFailover?: boolean;
    customIntegrations?: boolean;
    dedicatedManager?: boolean;
    notes?: string;
  };
}

const initialSurveyData: SurveyData = {
  businessInfo: {
    companyName: "",
    businessStage: "",
    companySize: "",
    targetMarket: "",
    vpnBusinessType: "",
    email: "",
  },
  applicationDetails: {
    platforms: [],
    monthlyActiveUsers: "",
    expectedGrowthPercent: "",
    launchTimeline: "",
    existingProduct: false,
  },
  infrastructure: {
    initialServers: "",
    regions: [],
    bandwidthPerServerMbps: "",
    autoScaling: false,
    availabilityTier: "",
  },
  security: {
    vpnProtocols: [],
    loggingPolicy: "",
    customSecurity: false,
    compliance: [],
  },
  billing: {
    pricingModel: "",
    monthlyBudgetUsd: "",
    analyticsRequired: false,
    billingIntegration: false,
    supportLevel: "",
  },
  futurePlans: {
    whiteLabel: false,
    multiRegionFailover: false,
    customIntegrations: false,
    dedicatedManager: false,
    notes: "",
  },
};

const steps = [
  { id: 1, title: "Business Info", icon: Building2 },
  { id: 2, title: "Application", icon: Smartphone },
  { id: 3, title: "Infrastructure", icon: Server },
  { id: 4, title: "Security", icon: Shield },
  { id: 5, title: "Billing", icon: CreditCard },
  { id: 6, title: "Future Plans", icon: Rocket },
];

const STORAGE_KEY = "vpn_survey_data";
const STORAGE_STEP_KEY = "vpn_survey_step";

// Survey Data Constants
const COMPANY_SIZE_OPTIONS = [
  { value: "solo", label: "Solo Founder" },
  { value: "2-5", label: "2-5 People" },
  { value: "6-20", label: "6-20 People" },
  { value: "20+", label: "20+ People" },
];

const BUSINESS_STAGE_OPTIONS = [
  { value: "idea", label: "Idea Stage" },
  { value: "mvp", label: "MVP / Prototype" },
  { value: "live", label: "Live Product" },
  { value: "scaling", label: "Scaling" },
];

const TARGET_MARKET_OPTIONS = [
  { value: "global", label: "Global" },
  { value: "north_america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia_pacific", label: "Asia Pacific" },
  { value: "middle_east", label: "Middle East" },
  { value: "latin_america", label: "Latin America" },
];

const VPN_BUSINESS_TYPE_OPTIONS = [
  { value: "consumer", label: "Consumer VPN App" },
  { value: "enterprise", label: "Enterprise VPN" },
  { value: "white_label", label: "White-Label Solution" },
  { value: "reseller", label: "Reseller / MSP" },
];

const PLATFORM_OPTIONS = [
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "web", label: "Web" },
  { value: "desktop", label: "Desktop" },
];

const MONTHLY_ACTIVE_USERS_OPTIONS = [
  { value: "0-1000", label: "0 - 1,000" },
  { value: "1000-10000", label: "1,000 - 10,000" },
  { value: "10000-50000", label: "10,000 - 50,000" },
  { value: "50000-100000", label: "50,000 - 100,000" },
  { value: "100000+", label: "100,000+" },
];

const EXPECTED_GROWTH_OPTIONS = [
  { value: "0-25", label: "0% - 25%" },
  { value: "25-50", label: "25% - 50%" },
  { value: "50-100", label: "50% - 100%" },
  { value: "100-200", label: "100% - 200%" },
  { value: "200+", label: "200%+" },
];

const LAUNCH_TIMELINE_OPTIONS = [
  { value: "immediate", label: "Immediate" },
  { value: "30_days", label: "Within 30 days" },
  { value: "60_days", label: "Within 60 days" },
  { value: "90_days", label: "Within 90 days" },
  { value: "6_months", label: "Within 6 months" },
];

const INITIAL_SERVERS_OPTIONS = [
  { value: "1-3", label: "1 - 3 servers" },
  { value: "3-5", label: "3 - 5 servers" },
  { value: "5-10", label: "5 - 10 servers" },
  { value: "10-20", label: "10 - 20 servers" },
  { value: "20+", label: "20+ servers" },
];

const SERVER_REGIONS_OPTIONS = [
  { value: "us-east", label: "US East" },
  { value: "us-west", label: "US West" },
  { value: "eu-west", label: "EU West" },
  { value: "eu-central", label: "EU Central" },
  { value: "asia-east", label: "Asia East" },
  { value: "asia-southeast", label: "Asia Southeast" },
];

const BANDWIDTH_OPTIONS = [
  { value: "100", label: "100 Mbps" },
  { value: "500", label: "500 Mbps" },
  { value: "1000", label: "1 Gbps" },
  { value: "5000", label: "5 Gbps" },
  { value: "10000", label: "10 Gbps" },
];

const AVAILABILITY_TIER_OPTIONS = [
  {
    value: "standard",
    label: "Standard (99.9% uptime)",
    description: "Suitable for most applications",
  },
  {
    value: "enterprise",
    label: "Enterprise (99.99% uptime)",
    description: "Multi-zone redundancy with failover",
  },
];

const VPN_PROTOCOLS_OPTIONS = [
  { value: "wireguard", label: "WireGuard" },
  { value: "openvpn", label: "OpenVPN" },
  { value: "ikev2", label: "IKEv2" },
  { value: "l2tp", label: "L2TP/IPSec" },
];

const LOGGING_POLICY_OPTIONS = [
  {
    value: "no_logs",
    label: "No Logs",
    description: "Zero logging of user activity",
  },
  {
    value: "minimal_logs",
    label: "Minimal Logs",
    description: "Connection timestamps only",
  },
  {
    value: "custom",
    label: "Custom",
    description: "Define your own logging policy",
  },
];

const COMPLIANCE_OPTIONS = [
  { value: "gdpr", label: "GDPR" },
  { value: "hipaa", label: "HIPAA" },
  { value: "soc2", label: "SOC 2" },
  { value: "none", label: "None" },
];

const PRICING_MODEL_OPTIONS = [
  {
    value: "pay_as_you_go",
    label: "Pay as You Go",
    description: "Pay only for what you use",
  },
  {
    value: "monthly",
    label: "Monthly Subscription",
    description: "Fixed monthly pricing",
  },
  {
    value: "custom",
    label: "Custom / Enterprise",
    description: "Tailored pricing for your needs",
  },
];

const MONTHLY_BUDGET_OPTIONS = [
  { value: "0-100", label: "$0 - $100" },
  { value: "100-500", label: "$100 - $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-5000", label: "$1,000 - $5,000" },
  { value: "5000+", label: "$5,000+" },
];

const SUPPORT_LEVEL_OPTIONS = [
  { value: "community", label: "Community / Self-Service" },
  { value: "standard", label: "Standard (Email Support)" },
  { value: "priority", label: "Priority (24h Response)" },
  { value: "premium", label: "Premium (Dedicated Support)" },
];

export function SurveyModal({ open, onOpenChange }: SurveyModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STORAGE_STEP_KEY);

      if (savedData) {
        setSurveyData(JSON.parse(savedData));
      }
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    } catch (error) {
      console.error("Error loading saved survey data:", error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(surveyData));
    } catch (error) {
      console.error("Error saving survey data:", error);
    }
  }, [surveyData]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STEP_KEY, currentStep.toString());
    } catch (error) {
      console.error("Error saving survey step:", error);
    }
  }, [currentStep]);

  const updateBusinessInfo = (field: keyof SurveyData["businessInfo"], value: string) => {
    setSurveyData((prev) => ({
      ...prev,
      businessInfo: { ...prev.businessInfo, [field]: value },
    }));
  };

  const updateApplicationDetails = (
    field: keyof SurveyData["applicationDetails"],
    value: string | string[] | boolean
  ) => {
    setSurveyData((prev) => ({
      ...prev,
      applicationDetails: { ...prev.applicationDetails, [field]: value },
    }));
  };

  const updateInfrastructure = (
    field: keyof SurveyData["infrastructure"],
    value: string | string[] | boolean
  ) => {
    setSurveyData((prev) => ({
      ...prev,
      infrastructure: { ...prev.infrastructure, [field]: value },
    }));
  };

  const updateSecurity = (
    field: keyof SurveyData["security"],
    value: string | string[] | boolean
  ) => {
    setSurveyData((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: value },
    }));
  };

  const updateBilling = (
    field: keyof SurveyData["billing"],
    value: string | boolean
  ) => {
    setSurveyData((prev) => ({
      ...prev,
      billing: { ...prev.billing, [field]: value },
    }));
  };

  const updateFuturePlans = (
    field: keyof SurveyData["futurePlans"],
    value: string | boolean
  ) => {
    setSurveyData((prev) => ({
      ...prev,
      futurePlans: { ...prev.futurePlans, [field]: value },
    }));
  };

  const toggleArrayValue = (
    section: "applicationDetails" | "infrastructure" | "security",
    field: string,
    value: string
  ) => {
    setSurveyData((prev) => {
      const currentArray = (prev[section] as any)[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [section]: { ...prev[section], [field]: newArray },
      };
    });
  };

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleNext = () => {
    // Validate email on step 1 before proceeding
    if (currentStep === 1 && !validateEmail(surveyData.businessInfo.email)) {
      return;
    }
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // Final email validation before submission
    if (!validateEmail(surveyData.businessInfo.email)) {
      setCurrentStep(1); // Go back to first step to fix email
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Survey Data:", surveyData);

    // Clear localStorage after successful submission
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
    } catch (error) {
      console.error("Error clearing survey data:", error);
    }

    setIsSubmitting(false);
    onOpenChange(false);
    setCurrentStep(1);
    setSurveyData(initialSurveyData);
    setEmailError("");
  };

  const handleClose = () => {
    // Don't clear localStorage on close - keep data for later
    setEmailError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 py-4">
          <DialogTitle className="text-xl font-semibold">
            Configure Your VPN Infrastructure
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Help us understand your needs to provision the perfect setup
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      isActive && "border-primary bg-primary text-primary-foreground",
                      isCompleted && "border-primary bg-primary/20 text-primary",
                      !isActive && !isCompleted && "border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "hidden h-0.5 w-8 mx-3 lg:block",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-h-[50vh] overflow-y-auto px-6 py-6">
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company or Startup Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={surveyData.businessInfo.companyName}
                  onChange={(e) => updateBusinessInfo("companyName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Company Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your company email"
                  value={surveyData.businessInfo.email}
                  onChange={(e) => {
                    updateBusinessInfo("email", e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Business Stage</Label>
                <Select
                  value={surveyData.businessInfo.businessStage}
                  onValueChange={(value) => updateBusinessInfo("businessStage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_STAGE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Company Size</Label>
                <RadioGroup
                  value={surveyData.businessInfo.companySize}
                  onValueChange={(value) => updateBusinessInfo("companySize", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  {COMPANY_SIZE_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`size-${option.value}`} />
                      <Label htmlFor={`size-${option.value}`} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Primary Target Market</Label>
                <Select
                  value={surveyData.businessInfo.targetMarket}
                  onValueChange={(value) => updateBusinessInfo("targetMarket", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target market" />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGET_MARKET_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type of VPN Business</Label>
                <Select
                  value={surveyData.businessInfo.vpnBusinessType}
                  onValueChange={(value) => updateBusinessInfo("vpnBusinessType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select VPN business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {VPN_BUSINESS_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Application Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Platform Type (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {PLATFORM_OPTIONS.map((platform) => (
                    <div key={platform.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`platform-${platform.value}`}
                        checked={surveyData.applicationDetails.platforms?.includes(platform.value)}
                        onCheckedChange={() =>
                          toggleArrayValue("applicationDetails", "platforms", platform.value)
                        }
                      />
                      <Label htmlFor={`platform-${platform.value}`} className="cursor-pointer">
                        {platform.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Estimated Monthly Active Users</Label>
                <Select
                  value={surveyData.applicationDetails.monthlyActiveUsers}
                  onValueChange={(value) => updateApplicationDetails("monthlyActiveUsers", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select estimated users" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHLY_ACTIVE_USERS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Expected Growth in Next 6 Months</Label>
                <Select
                  value={surveyData.applicationDetails.expectedGrowthPercent}
                  onValueChange={(value) => updateApplicationDetails("expectedGrowthPercent", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected growth" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPECTED_GROWTH_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Planned Launch Timeline</Label>
                <Select
                  value={surveyData.applicationDetails.launchTimeline}
                  onValueChange={(value) => updateApplicationDetails("launchTimeline", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select launch timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {LAUNCH_TIMELINE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="existingProduct"
                  checked={surveyData.applicationDetails.existingProduct}
                  onCheckedChange={(checked) =>
                    updateApplicationDetails("existingProduct", !!checked)
                  }
                />
                <Label htmlFor="existingProduct" className="cursor-pointer">
                  I have an existing VPN app/product
                </Label>
              </div>
            </div>
          )}

          {/* Step 3: Infrastructure Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Initial Number of VPN Servers Required</Label>
                <Select
                  value={surveyData.infrastructure.initialServers}
                  onValueChange={(value) => updateInfrastructure("initialServers", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of servers" />
                  </SelectTrigger>
                  <SelectContent>
                    {INITIAL_SERVERS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Server Regions (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {SERVER_REGIONS_OPTIONS.map((region) => (
                    <div key={region.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region.value}`}
                        checked={surveyData.infrastructure.regions?.includes(region.value)}
                        onCheckedChange={() =>
                          toggleArrayValue("infrastructure", "regions", region.value)
                        }
                      />
                      <Label htmlFor={`region-${region.value}`} className="cursor-pointer">
                        {region.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Expected Bandwidth per Server</Label>
                <Select
                  value={surveyData.infrastructure.bandwidthPerServerMbps}
                  onValueChange={(value) => updateInfrastructure("bandwidthPerServerMbps", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bandwidth" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANDWIDTH_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="autoScaling"
                  checked={surveyData.infrastructure.autoScaling}
                  onCheckedChange={(checked) =>
                    updateInfrastructure("autoScaling", !!checked)
                  }
                />
                <Label htmlFor="autoScaling" className="cursor-pointer">
                  Enable auto-scaling based on traffic
                </Label>
              </div>

              <div className="space-y-2">
                <Label>High Availability Requirement</Label>
                <RadioGroup
                  value={surveyData.infrastructure.availabilityTier}
                  onValueChange={(value) => updateInfrastructure("availabilityTier", value)}
                  className="space-y-3"
                >
                  {AVAILABILITY_TIER_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-start space-x-2">
                      <RadioGroupItem value={option.value} id={`tier-${option.value}`} />
                      <div>
                        <Label htmlFor={`tier-${option.value}`} className="cursor-pointer font-medium">
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 4: Security and Compliance */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred VPN Protocols (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {VPN_PROTOCOLS_OPTIONS.map((protocol) => (
                    <div key={protocol.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`protocol-${protocol.value}`}
                        checked={surveyData.security.vpnProtocols?.includes(protocol.value)}
                        onCheckedChange={() =>
                          toggleArrayValue("security", "vpnProtocols", protocol.value)
                        }
                      />
                      <Label htmlFor={`protocol-${protocol.value}`} className="cursor-pointer">
                        {protocol.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logging Policy</Label>
                <RadioGroup
                  value={surveyData.security.loggingPolicy}
                  onValueChange={(value) => updateSecurity("loggingPolicy", value)}
                  className="space-y-3"
                >
                  {LOGGING_POLICY_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-start space-x-2">
                      <RadioGroupItem value={option.value} id={`log-${option.value}`} />
                      <div>
                        <Label htmlFor={`log-${option.value}`} className="cursor-pointer font-medium">
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customSecurity"
                  checked={surveyData.security.customSecurity}
                  onCheckedChange={(checked) =>
                    updateSecurity("customSecurity", !!checked)
                  }
                />
                <Label htmlFor="customSecurity" className="cursor-pointer">
                  Need custom security configurations
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Compliance Requirements (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {COMPLIANCE_OPTIONS.map((compliance) => (
                    <div key={compliance.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`compliance-${compliance.value}`}
                        checked={surveyData.security.compliance?.includes(compliance.value)}
                        onCheckedChange={() =>
                          toggleArrayValue("security", "compliance", compliance.value)
                        }
                      />
                      <Label htmlFor={`compliance-${compliance.value}`} className="cursor-pointer">
                        {compliance.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Billing and Operations */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Preferred Pricing Model</Label>
                <RadioGroup
                  value={surveyData.billing.pricingModel}
                  onValueChange={(value) => updateBilling("pricingModel", value)}
                  className="space-y-3"
                >
                  {PRICING_MODEL_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-start space-x-2">
                      <RadioGroupItem value={option.value} id={`price-${option.value}`} />
                      <div>
                        <Label htmlFor={`price-${option.value}`} className="cursor-pointer font-medium">
                          {option.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Estimated Monthly Infrastructure Budget (USD)</Label>
                <Select
                  value={surveyData.billing.monthlyBudgetUsd}
                  onValueChange={(value) => updateBilling("monthlyBudgetUsd", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHLY_BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analyticsRequired"
                    checked={surveyData.billing.analyticsRequired}
                    onCheckedChange={(checked) =>
                      updateBilling("analyticsRequired", !!checked)
                    }
                  />
                  <Label htmlFor="analyticsRequired" className="cursor-pointer">
                    Need usage analytics dashboard
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="billingIntegration"
                    checked={surveyData.billing.billingIntegration}
                    onCheckedChange={(checked) =>
                      updateBilling("billingIntegration", !!checked)
                    }
                  />
                  <Label htmlFor="billingIntegration" className="cursor-pointer">
                    Need billing/subscription integration
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Level of Technical Support Required</Label>
                <Select
                  value={surveyData.billing.supportLevel}
                  onValueChange={(value) => updateBilling("supportLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select support level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORT_LEVEL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 6: Future Plans */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Future Requirements</Label>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whiteLabel"
                    checked={surveyData.futurePlans.whiteLabel}
                    onCheckedChange={(checked) =>
                      updateFuturePlans("whiteLabel", !!checked)
                    }
                  />
                  <Label htmlFor="whiteLabel" className="cursor-pointer">
                    White-label branding requirement
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multiRegionFailover"
                    checked={surveyData.futurePlans.multiRegionFailover}
                    onCheckedChange={(checked) =>
                      updateFuturePlans("multiRegionFailover", !!checked)
                    }
                  />
                  <Label htmlFor="multiRegionFailover" className="cursor-pointer">
                    Multi-region failover requirement
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="customIntegrations"
                    checked={surveyData.futurePlans.customIntegrations}
                    onCheckedChange={(checked) =>
                      updateFuturePlans("customIntegrations", !!checked)
                    }
                  />
                  <Label htmlFor="customIntegrations" className="cursor-pointer">
                    Custom integrations needed
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dedicatedManager"
                    checked={surveyData.futurePlans.dedicatedManager}
                    onCheckedChange={(checked) =>
                      updateFuturePlans("dedicatedManager", !!checked)
                    }
                  />
                  <Label htmlFor="dedicatedManager" className="cursor-pointer">
                    Dedicated account manager needed
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes or Special Requirements</Label>
                <Textarea
                  id="notes"
                  placeholder="Tell us about any specific requirements, integrations, or questions you have..."
                  rows={4}
                  value={surveyData.futurePlans.notes}
                  onChange={(e) => updateFuturePlans("notes", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="mt-2 text-center text-xs font-light text-muted-foreground/50">
            Step {currentStep} of 6: {steps[currentStep - 1].title}
          </div>

          {currentStep < 6 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <Check className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
