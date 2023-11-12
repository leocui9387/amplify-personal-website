https://analystcave.com/vba-xml-working-xml-files/ 

https://wellsr.com/vba/2018/excel/download-files-with-vba-urldownloadtofile/

# Asynchronous HTTP Request from Excel Macros 

Excel macros have a huge weakness in that they lock up when running large processes. There are various ways to reduce this lock up time, but inevitably people want better. The best way to provide this is to create webservices that do the work remotely on a server while the user just waits for a message. The webservice can be created with any programming language/framework (I have only used ASP.NET MVC Framework 4.8).

The meat of the method is in the following Stack Overflow Q&A ([Link](https://stackoverflow.com/questions/39397067/asynchronous-http-post-request-in-ms-access)). This will be a distillation of the information in the Q&A with some added bells and whistles for happier users.

# Step 1: Create the Asynchronous Object 
This is a hack, as Excel macros are not supposed to be able to handle asynchronous anything. Macros are intended to be single threaded. However, the following details how you can hack a VBA class into an asynchronous class.

## Create the asynchronous object
Create a class module with the following text, then export it as a **.cls** file. I will call my object **Async_HTTP**.

```
Option Explicit
Dim m_xmlHttp As MSXML2.XMLHTTP
Dim Name As String
Public g_form As Object


Public Sub Initialize(ByRef xmlHttpRequest As MSXML2.XMLHTTP)
			Set m_xmlHttp = xmlHttpRequest
End Sub

Sub OnReadyStateChange()
   If m_xmlHttp.ReadyState = 4 Then
      If m_xmlHttp.status = 200 Then
         g_form.Label1.BackColor = RGB(0, 255, 0)
         g_form.Label1 = "Upload Complete"
      Else
         g_form.Label1.BackColor = RGB(255, 0, 0)
         g_form.Label1 = "Error. Please Contact IT"
      End If
   End If
End Sub
```

Open the **.cls** file in a text editor and add in the bold line to the raw text of the **.cls** file.

```
VERSION 1.0 CLASS
BEGIN
   MultiUse = -1  'True
END
Attribute VB_Name = "Class1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False

Option Explicit
Dim m_xmlHttp As MSXML2.XMLHTTP
Dim Name As String
Public g_form As Object </br


Public Sub Initialize(ByRef xmlHttpRequest As MSXML2.XMLHTTP)
   Set m_xmlHttp = xmlHttpRequest
End Sub

Sub OnReadyStateChange()
**Attribute OnReadyStateChange.VB_UserMemId = 0**
   If m_xmlHttp.ReadyState = 4 Then
      If m_xmlHttp.Status = 200 Then
         g_form.Label1.BackColor = RGB(0, 255, 0)
         g_form.Label1 = "Upload Complete"
      Else
         g_form.Label1.BackColor = RGB(255, 0, 0)
         g_form.Label1 = "Error. Please Contact IT" & m_xmlHttp.responseText
      End If
   End If
End Sub
```

Here, you're inserting an [Attribute](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes/) into the VBA method **OnReadyStateChange**.
##Create Status Form
You want to create this so that users won't just sit there waiting for a response. The following form will be called and give the user something to see and be comforted by while waiting.

I put this in a file called **f_LoadScreen.frm**:
```
VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} f_LoadScreen 
   Caption         =   "Budget Upload Status"
   ClientHeight    =   480
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   4050
   OleObjectBlob   =   "f_LoadScreen.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "f_LoadScreen"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
```

## Using the Async Object
When calling a webservice, I typically insert any POST data in a JSON format. This way I can just create a method that takes a JSON format string and throw it into the Async_HTTP object. The bold line, in the code below, is where you set the status form object so that the Async_HTTP object can manipulate the status show to the user.

```
Private Sub Upload(ByRef p_JsonData As String, ByRef p_URL as String)
   Dim asyncHandler As New Async_HTTP
   Dim request As Object
   Set request = CreateObject("MSXML2.XMLHTTP")

**   Dim fm As New f_LoadScreen
   fm.Show vmodeless
   Set asyncHandler.g_form = fm**
   asyncHandler.Initialize request
   asyncHandler.OnReadyStateChange

   request.OnReadyStateChange = asyncHandler
   request.Open "POST", p_URL, True
   request.setRequestHeader "Content-type", "application/json"
   request.send (p_JsonData)    
End Sub
```
