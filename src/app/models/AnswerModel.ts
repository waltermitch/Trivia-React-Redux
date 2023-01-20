export default interface AnswerModel {
    id: number;
    answer: string;
    explain_answer: string | undefined;
    explain_image: string | undefined;
    is_correct: number;
    level_status: string;
}
