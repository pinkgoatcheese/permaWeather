"use strict";
/*
document.getElementById('btnLoad').onclick = function loadWalletFile() {
    var inputWalletFile = document.getElementById('userInputWalletFile');
    var walletFile = inputWalletFile.files[0];
    console.log(walletFile);
    const readWallet = new FileReader();

    readWallet.onload = loginToArweave;
    readWallet.readAsText(walletFile);
    //    document.getElementById('file').innerText = reader.result;
}
*/

    
function loginToArweave() 
{

    window.addEventListener("drop", function (event) {
        if (event.target == "header-right") {
			var inputWalletFile = document.getElementById('userInputWalletFile');
		    var walletFile = inputWalletFile.files[0];
    		console.log(walletFile);
    		const readWallet = new FileReader();
    		readWallet.readAsText(walletFile);
    		let lines = readWallet.target.result;
    		jwk = JSON.parse(lines);
			console.log(jwk);
			event.preventDefault();
        	}
        }, false);

    //  console.log(typeof data);
    //  stringData = toString(data); 
    //  console.log(stringData);
        // Initialisation

    // Get the wallet address for a private key save it as currentAddress
    arweave.wallets.jwkToAddress(jwk).then((address) => {
        currentAddress = String(address);
        console.log(`Arweave wallet address: ${currentAddress}`);
        document.getElementById("btnLoad").textContent = "Logged In";
    }
    )}

    document.getElementById('saveToArwaveButton').onclick = async () => {
        // String() = convert object to string
        let dataToSave = [saveCity, saveTempF, saveTempC, saveWindSpeed, saveTime];
        let jsonDataToSave = JSON.stringify(dataToSave);
        console.log(jsonDataToSave);
        let transactionA = await arweave.createTransaction( {
                data: jsonDataToSave,
            }, jwk );
            transactionA.addTag('App-Name', 'Perma Weather');
            transactionA.addTag('App-Version', '0.0.1');
            transactionA.addTag(saveTime);
            transactionA.addTag('Content-Type', 'text/html');
            console.log(saveTime);
            await arweave.transactions.sign(transactionA, jwk);
            console.log(transactionA.id);
            await arweave.transactions.post(transactionA);
            console.log('Data Saved');
        }
    // function saveTheDataToArweave() {
    // Get an address balance
    //arweave.wallets.getBalance(currentAddress).then((balance) => {
    // let winston = balance;
    // let ar = arweave.ar.winstonToAr(balance);

    // console.log(winston);
    //125213858712

    //console.log(ar);
    //0.125213858712

