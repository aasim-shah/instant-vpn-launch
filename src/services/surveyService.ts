import { api } from '@/lib/api';
import { AxiosResponse } from 'axios';

// Survey Data Types
export interface SurveyBusinessInfo {
  companyName?: string;
  businessStage?: string;
  companySize?: string;
  targetMarket?: string;
  vpnBusinessType?: string;
  email: string;
}

export interface SurveyApplicationDetails {
  platforms?: string[];
  monthlyActiveUsers?: string;
  expectedGrowthPercent?: string;
  launchTimeline?: string;
  existingProduct?: boolean;
}

export interface SurveyInfrastructure {
  initialServers?: string;
  regions?: string[];
  bandwidthPerServerMbps?: string;
  autoScaling?: boolean;
  availabilityTier?: string;
}

export interface SurveySecurity {
  vpnProtocols?: string[];
  loggingPolicy?: string;
  customSecurity?: boolean;
  compliance?: string[];
}

export interface SurveyBilling {
  pricingModel?: string;
  monthlyBudgetUsd?: string;
  analyticsRequired?: boolean;
  billingIntegration?: boolean;
  supportLevel?: string;
}

export interface SurveyFuturePlans {
  whiteLabel?: boolean;
  multiRegionFailover?: boolean;
  customIntegrations?: boolean;
  dedicatedManager?: boolean;
  notes?: string;
}

export interface CustomerSurveyData {
  businessInfo: SurveyBusinessInfo;
  applicationDetails: SurveyApplicationDetails;
  infrastructure: SurveyInfrastructure;
  security: SurveySecurity;
  billing: SurveyBilling;
  futurePlans: SurveyFuturePlans;
}

// API Response Types
export interface ApiSuccessResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Survey Service
export const surveyService = {
  /**
   * Submit customer survey data
   * @param surveyData - Complete survey data object
   * @returns Promise with API response
   */
  submitSurvey: async (
    surveyData: CustomerSurveyData
  ): Promise<AxiosResponse<ApiSuccessResponse>> => {
    try {
      const response = await api.post<ApiSuccessResponse>(
        '/api/v1/customer-survey',
        surveyData
      );
      return response;
    } catch (error) {
      // Re-throw the error to be handled by the caller
      throw error;
    }
  },

  /**
   * Get survey by ID (if needed for future features)
   * @param surveyId - Survey ID
   * @returns Promise with survey data
   */
  getSurvey: async (surveyId: string): Promise<AxiosResponse<ApiSuccessResponse<CustomerSurveyData>>> => {
    try {
      const response = await api.get<ApiSuccessResponse<CustomerSurveyData>>(
        `/api/v1/customer-survey/${surveyId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default surveyService;
