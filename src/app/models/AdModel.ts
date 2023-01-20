export default interface AdModel {
    header_scripts: { code: string };
    above_correct_answer: { code: string, min_level: number, label: number };
    below_answer_explain: { code: string, min_level: number, label: number };
    page_level_1:  { code: string, min_level: number, label: number };
    page_level_2:  { code: string, min_level: number, label: number };
    page_level_3:  { code: string, min_level: number, label: number };
    above_headline:  { code: string, min_level: number, label: number };
    below_headline:  { code: string, min_level: number, label: number };
    above_buttons:  { code: string, min_level: number, label: number };
    above_score:  { code: string, min_level: number, label: number };
    right_rail_upper:  { code: string, min_level: number, label: number };
    right_rail_middle:  { code: string, min_level: number, label: number };
    right_rail_bottom:  { code: string, min_level: number, label: number };
    below_buttons:  { code: string, min_level: number, label: number };
    below_buttons_2:  { code: string, min_level: number, label: number };
    below_question:  { code: string, min_level: number, label: number };
}
