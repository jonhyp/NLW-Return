import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BESTi',
      comment: 'Melhora issos',
      screenshot: 'data:image/png;base64/324534534534534'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })

  it('should not be able to submit a feedback without type', () => {


    expect(submitFeedback.execute({
      type: '',
      comment: 'Melhora issos',
      screenshot: 'data:image/png;base64/324534534534534'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', () => {


    expect(submitFeedback.execute({
      type: 'BESTi',
      comment: '',
      screenshot: 'data:image/png;base64/324534534534534'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback with an invalid screenshot', () => {


    expect(submitFeedback.execute({
      type: 'BESTi',
      comment: 'Melhora isso',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  })



})



