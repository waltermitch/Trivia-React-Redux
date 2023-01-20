import AnswerModel from "./AnswerModel";

export default interface QuestionModel {
    id: number;
    question: string;
    image: string;
    answers: Array<AnswerModel>
    preloadImg: any;
}
