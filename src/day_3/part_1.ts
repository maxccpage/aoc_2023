
  import { inputIterator } from "../shared/utils";

  export default (input: string) => {
    let result = 0;

    inputIterator(input)((line) => {
        // Code Here 
    });

    console.log('result --->', result);
  }
  