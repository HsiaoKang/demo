{let abortController = null;

document
  .querySelector("#calculate")
  .addEventListener("click", async ({ target }) => {
    if (abortController) {
      abortController.abort();
      abortController = null;
      target.innerText = "Calculate";
      return;
    }
    abortController = new AbortController();
    target.innerText = "stop calculation";

    try {
      const result = await calculate(abortController.signal);
      alert(result);
    } catch {
      alert("? ? ?");
    } finally {
      abortController = null;
      target.innerText = "Calculate";
    }
  });

// function calculate(abortSignal) {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       resolve(1);
//     }, 5000);

//     // 按照规范需要 抛出 AbortError DOMException 异常
//     abortSignal.addEventListener("abort", v => {
//       console.log(v);
//       const error = new DOMException(
//         "Calculation aborted by the user",
//         "AbortError"
//       );
//       clearTimeout(timeout);
//       reject(error);
//     });
//   });
// }

function calculate( abortSignal ) {
    return new Promise( ( resolve, reject ) => {
      const error = new DOMException( 'Calculation aborted by the user', 'AbortError' ); // 1
  
      if ( abortSignal.aborted ) { // 2
        return reject( error );
      }
  
      const timeout = setTimeout( ()=> {
        resolve( 1 );
      }, 5000 );
  
      abortSignal.addEventListener( 'abort', () => {
        clearTimeout( timeout );
        reject( error );
      } );
    } );
  }

}