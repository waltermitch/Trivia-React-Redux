export default interface UserModel {
    current_level: number;
    current_level_correct_answers: number;
    current_level_latest_votes: {
        latest: number[];
        correct: number;
        incorrect: number;
        total: number;
    }
    correct: number;
    incorrect: number;
    latest: number;
    total: number;
    current_level_total_answered: number;
    current_quiz: number;
    current_quiz_total_answered: number;
    id: string | null;
    email: string | null;
    next_level_requirements: {
        correct: number,
        num: number
    };
    points: number;
    rank: string;
    registered: boolean;
    streak: number;
    tokens: number;
    bonus_tokens: number;
    logged_with_password: boolean;
    registered_with_password: boolean;
    email_verified: boolean;
    subscribed?: boolean;
    customer_id: string | null;
    subscription_id: string | null;
    subscription_ends: string | null;
    utm_campaign: string | null;
    utm_source: string | null;
    subscription_plan: string | null | undefined;
    subscription_status: string | null | undefined;
    subscription_trial_used: number | null;
    
}
