//----------------------------Title------------------------------------------------------------------------
function MenuChoice()
{
    if (document.getElementById("menu").value == "Get Product List")
    {
        document.getElementById("one").style.visibility = "visible";
        document.getElementById("two").style.visibility = "hidden";
        document.getElementById("three").style.visibility = "hidden";
        document.getElementById("four").style.visibility = "hidden";
        document.getElementById("five").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add Product")
    {
        document.getElementById("one").style.visibility = "hidden";
        document.getElementById("two").style.visibility = "visible";
        document.getElementById("three").style.visibility = "hidden";
        document.getElementById("four").style.visibility = "hidden";
        document.getElementById("five").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Product Data")
    {
        document.getElementById("one").style.visibility = "hidden";
        document.getElementById("two").style.visibility = "hidden";
        document.getElementById("three").style.visibility = "visible";
        document.getElementById("four").style.visibility = "hidden";
        document.getElementById("five").style.visibility = "hidden";
    }
     else if (document.getElementById("menu").value == "Delete Product")
    {
        document.getElementById("one").style.visibility = "hidden";
        document.getElementById("two").style.visibility = "hidden";
        document.getElementById("three").style.visibility = "hidden";
        document.getElementById("four").style.visibility = "visible";
        document.getElementById("five").style.visibility = "hidden";
    }
     else if (document.getElementById("menu").value == "Select One")
    {
        document.getElementById("one").style.visibility = "hidden";
        document.getElementById("two").style.visibility = "hidden";
        document.getElementById("three").style.visibility = "hidden";
        document.getElementById("four").style.visibility = "hidden";
        document.getElementById("five").style.visibility = "visible";
    }
    else 
    {
        document.getElementById("one").style.visibility = "hidden";
        document.getElementById("two").style.visibility = "hidden";
        document.getElementById("three").style.visibility = "hidden";
        document.getElementById("four").style.visibility = "hidden";
        document.getElementById("five").style.visibility = "hidden";
    }
}


//----------------------------One--------------------------------------------------------------------------
function GetCategory()
{
    var objRequest=new XMLHttpRequest();
    var url="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories/";
    url+=document.getElementById("categid").value;
    
    objRequest.onreadystatechange=function()
    {
      if (objRequest.readyState==4&&objRequest.status==200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(output);
        }  
    }
    objRequest.open("GET",url,true);
    objRequest.send();
}
function Output(result)
{
    var count = 0
    var displaytext="<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    for(count=0;count<result.GetAllCategoriesResult.length;count++)
    {
        displaytext+="<tr><td>"+result.GetAllCategoriesResult[count].CID+"</td><td>"+result.GetAllCategoriesResult[count].CName+"</td><td>"+result.GetAllCategoriesResult[count].CDescription+"</td></tr>";
    }
    document.getElementById("categorydisplay").innerHTML=displaytext;
}
//----------------------------Two--------------------------------------------------------------------------

function CreateProduct()
{
    var objRequest=new XMLHttpRequest();
    var url="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect Customer data from web page
    var proname=document.getElementById("productname").value;
    var prodesc=document.getElementById("productdesc").value;
    //Create the parameter string
    var newpro='{"CName":"'+proname+'","CDescription":"'+customername+'"}';
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange=function()
    {
        if (objRequest.readyState==4&&objRequest.status==200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST",url,true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(newpro);
    
}

function OperationResult(output)
{
    if (output.WasSuccessful==1)
    {
        document.getElementById("addresult").innerHTML="The operation was successful!"
    }
    else
    {
        document.getElementById("addresult").innerHTML="The operation was not successful!"+"<br>"+output.Exception;
    }
    
}


//----------------------------Three------------------------------------------------------------------------

function ChangeOrder()
{
    var objRequest=new XMLHttpRequest();
    var url="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect Category Data
    var categoryid=document.getElementById("catid").value;
    var categorydesc=document.getElementById("catdesc").value;
    
    //Create the parameter string
    var categorydata='{"CID":'+categoryid+',"CDescription":"'+categorydesc+'"}';
    //Checking for AJAX operation return
    objRequest.onreadystatechange=function()
    {
        if (objRequest.readyState==4&&objRequest.status==200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResultChange(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST",url,true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(categorydata);
}
function OperationResultChange(output)
{
    if (output.WasSuccessful==1)
    {
        document.getElementById("changeresult").innerHTML="The operation was successful!"
    }
    else
    {
        document.getElementById("changeresult").innerHTML="The operation was not successful!"+"<br>"+output.Exception;
    }
}

//----------------------------Four-------------------------------------------------------------------------
function DeleteProduct()
{ 
    var objRequest = new XMLHttpRequest(); //Create AJAX request objet
    
    //Create URL and Query string
    var url="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url+=document.getElementById("deleteproductid").value;
    
    //Check that the objet has returned data
    objRequest.onreadystatechange=function()
    {
        if (objRequest.readyState==4 && objRequest.status ==200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResultTwo(result);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET",url,true);
    objRequest.send();
}
function OperationResultTwo(output)
{
    if (output.WasSuccessful==1)
    {
        document.getElementById("deleteresult").innerHTML="The operation was successful!"
    }
    else
    {
        document.getElementById("deleteresult").innerHTML="The operation was not successful!"+"<br>"+output.Exception;
    }
}



//----------------------------Five-------------------------------------------------------------------------