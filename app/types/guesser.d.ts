declare module 'guesser' {
    interface GuessResult {
      language: string;
      probability: number;
    }
  
    function guess(code: string): GuessResult;
  
    export default {
      guess
    };
}