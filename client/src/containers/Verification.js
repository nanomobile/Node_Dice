import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';

const Verification = () => {
    const codeString = `  
//the seed pair itself
//dont forget to exclude the dash and the nonce!
var clientSeed = "your client seed"; 
var serverSeed = "your server seed";
//bet made with seed pair (excluding current bet)
var nonce      = 0;
//crypto lib for hmac function
var crypto = require('crypto');
var roll = function(key, text) {
    //create HMAC using server seed as key and client seed as message
    var hash = crypto.createHmac('sha512', key).update(text).digest('hex');
    var index = 0;
    var lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);
    //keep grabbing characters from the hash while greater than
    while (lucky >= Math.pow(10, 6)) {
            index++;
        lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);
        //if we reach the end of the hash, just default to highest number
        if (index * 5 + 5 > 128) {
                lucky = 99.99;
            break;
        }
    }
    lucky %= Math.pow(10, 4);
    lucky /= Math.pow(10, 2);
    return lucky;
}
console.log(roll(serverSeed, clientSeed+'-'+nonce));
`;
    return (
        <div>
            <div className="col-sm-12">
                <h1 className="page-heading">Verification</h1>
            </div>

            <div className="col-sm-7">
                <div className="the-box">
                    <h4 className="bolded">
                        Provably Fair
        </h4>
                    <p className="text-info font-large">
                        Node dice offers state of the art verification which allows our users to check the integrity of every roll and confirm they are not manipulated. Our random numbers are generated through the use of two seeds, a server seed, and your client seed. The server seed is created before you specify your client seed, ensuring that a server seed purposely in our favor cannot be generated. Together, along with the nonce (# of bets made with seed pair), the seeds are used to create a provably fair roll number within the 0-99.99 range.
        </p> </div>
            </div>

            <div className="col-sm-7">
                <div className="the-box">
                    <h4 className="bolded">
                        Seeds
        </h4>
                    <p className="text-info">
                        In the provably fair tab, users can change and verify seeds used. To do this, click "Rerandomize" near the top of the provably fair tab. Before you specify your own seed, you are shown the SHA256 hash of the server seed that will be used alongside whichever seed you pick. Changing the client seed used will also reveal the previous server seed, which you can then verify was the seed we hashed and showed you.
        </p>
                </div>
            </div>
            <div className="col-sm-7">
                <div className="the-box">
                    <h4 className="bolded">
                        Roll Numbers
        </h4>
                    <p className="text-info">
                        To create a roll number, Primedice uses a multi-step process to create a roll number 0-99.99. Both client and server seeds and a nonce are combined with hmac-sha512(server_seed, client_seed-nonce) which will generate a hex string. The nonce is the # of bets you made with the current seed pair. First five characters are taken from the hex string to create a roll number that is 0-1,048,575. If the roll number is over 999,999, the proccess is repeated with the next five characters skipping the previous set. This is done until a number less than 1,000,000 is achieved. In the astronomically unlikely event that all possible 5 character combinations are greater, 99.99 is used as the roll number. The resulting number 0-999,999 is applied a modulus of 10^4, to obtain a roll number 0-9999, and divided by 10^2 to result a 0-99.99 number.
        </p>
                </div>
            </div>

            <div className="col-sm-7">
                <div className="the-box">
                    <h4 className="bolded">
                        How to Verify
        </h4>
                    <p className="text-info">
                        You can use a third party tool to verify roll numbers or use the following Node.js script that recreates the proccess described above. It will output your roll number.
</p>
                   <SyntaxHighlighter language="javascript" style={docco}>{codeString}</SyntaxHighlighter>

                </div>
            </div>
        </div>
    );

};

export default Verification;