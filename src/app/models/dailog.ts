export interface DailogModel {
    id: string;
    language: string;
    dialogName: string;
    dialogId: string;
    dialogTexts: DailogTexts[]
}

export interface DailogTexts {
    dialogSeqNumber: number;
    dialogText: string;
}
