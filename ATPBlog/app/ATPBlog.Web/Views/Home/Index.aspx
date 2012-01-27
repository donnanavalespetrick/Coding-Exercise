<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="indexContent" ContentPlaceHolderID="MainContentPlaceHolder" runat="server">
    <h2>
        Exercise Description</h2>
    <h3>
        What to do?</h3>
    <p>
        Create a basic Blog using ASP.NET MVC 3 and the S#arpArchitecture. Complete this
        and post it on git-hub when done. Solution should be submitted on or before end
        of day Monday, Jan 30,2012. Use <a href="https://github.com/sharparchitecture/Sharp-Architecture/tree/1.9.6.0">
            Sharp-Architecture release 1.9.6.0</a>
        <h4>
            Requirements:</h4>
        <ol>
            <li>The user should be able to create new blog entries.</li>
            <li>The user should be able to remove blog entries.</li>
            <li>Blog entries should be displayed in reverse chronological order.</li>
            <li>Use jquery ajax to redraw the page when the user creates or removes an entry.</li>
        </ol>
    </p>
    <p>
        Beyond the basic project structure, do not use the code generators to create entities
        and controllers.
    </p>
</asp:Content>
