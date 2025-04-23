export interface ITermsSection {
    title: string;
    content: string;
}
   
export interface ITermsContent {
    intro: string;
    sections: ITermsSection[];
}