'use strict';

jQuery(function( $ ){
    // plugin function
    $.fn.formToJson = function( resultContainer ){
        // console.log('this is from plugin');

        // define form
        const form = this;
        // define submitted data
        let submittedData = [];

        // define form data structure
        let formData = {
            id: Number,
            name: String,
            phone: String,
            message: String,
            createdDate: String
        };
        // define json data for output
        let jsonOutputData = Object.create(formData);

        // form submission function
        $(form).submit(function( event ){
            event.preventDefault();

            sortData( $(form).serialize() );

            // run json data function
            jsonData();

            // display json data
            outputData();

            // reset data
            resetData();

        });

        // sort data function
        function sortData( data ){
            // sanity check
            if(data != undefined){
                // regular expessions
                const regxSpace = /(?:%20)/gi;
                const regxEmail = /(?:%40)/gi;
                const regxLineBreak = /(?:%0D%0A)/gi;
                // save data by replacing with regx and split with '&' as parts
                let sortedData = data.replace(regxSpace, ' ').replace(regxEmail, '@').replace(regxLineBreak, '\n').split('&');
                // iterate through sortedData and save as array into submittedData
                $(sortedData).each(function(index, element){
                    submittedData.push(element.split('='));
                });

            }
        };

        // json data function
        function jsonData(){
            // sanity check
            if(submittedData != undefined || submittedData != null){
                // create JSON data
                $(submittedData).promise().done(function(){
                    // save json data
                    jsonOutputData.id = Math.floor(Math.random()*10);
                    jsonOutputData.name = submittedData[0][1];
                    jsonOutputData.phone = submittedData[1][1];
                    jsonOutputData.message = submittedData[2][1];
                    jsonOutputData.createdDate = Date.now()
                });
            }
        };

        // output data
        function outputData(){
            // stingify jsonOutputData for output
            let stringifyJsonData = JSON.stringify(jsonOutputData);

            // check if output target is provided
            if(resultContainer !== undefined || resultContainer !== null){
                $(jsonOutputData).promise().done(function(){
                    $(resultContainer).html( stringifyJsonData );
                    // return stringifyJsonData;
                    console.log(stringifyJsonData); // log the JSON data

                    // export file
                    // var txtFile = "./test.txt";
                    // var file = new File(txtFile,"write");
                    // //var str = JSON.stringify(JsonExport);
                    // console.log("opening file...");
                    // file.open(); 
                    // console.log("writing file..");
                    // file.writeline(stringifyJsonData);
                    // file.close();

                    window.alert("Thank you for your Message.");
                });
            }
            else{
                // else just return the JSON data
                console.log('resultContainer undefined');
                return stringifyJsonData;
            }
        }

        // reset data
        function resetData(){
            // reset all data
            submittedData = [];
            jsonOutputData = {};
        }
        
    }
}(jQuery));