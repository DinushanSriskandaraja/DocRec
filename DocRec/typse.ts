export type RootStackParamList = {
  ChatLanding: undefined;
  Suggestions: { symptoms: string };
  DoctorDetail: { doctor: any }; // You can replace `any` with a Doctor interface
};
