import QuestionModel from "./QuestionModel";

export interface QuizModel {
    id: number;
    title: string;
    title_short: string;
    slug: string;
    description: string;
    featured_image: string;
    include_at_homepage: number;
    include_at_tagpage: number;
    level_status?: string | undefined;
    questions: QuestionModel[];
}
