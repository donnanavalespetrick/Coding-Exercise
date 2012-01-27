/*-------------------------------------------AJAX CALL WRAPPER------------------------------------------------*/
/*Wrapper of ajax calls. Used so that ajax calls are typed in a single line of code.
Parameters:
postURL - the URL to which the request is sent
postData - data to be sent to the server
timeout - the timeout for the request (in milliseconds)
onSuccessFn - the function to be called if the request succeeds
onErrorFn - the function to be called if the request fails
paramOnSuccess - data to be passed to the success function
*/
function ajaxPost(postURL, postData, timeout, onSuccessFn, onErrorFn, paramOnSuccess) {
    $.ajax(
    {
        url: postURL,
        type: "POST",
        data: postData,
        dataType: "json",
        timeout: timeout,
        error: function (req, status, error) {
            onErrorFn(req, status, error);
        },
        success: function (result) {
            onSuccessFn(result, paramOnSuccess);
        }
    });
};

/*----------------------------------------DISPLAY/CLEAR ERROR--------------------------------------------------*/
/*Simple functions to display or clear the error message. This can be enhaced to accept the contol where the error 
message will be displayed, and css class to add to the control.*/

function displayErrorMessage(message) {
    $('#errorMessage').html(message);
    $('#errorMessage').css('display', 'block');
}

function clearErrorMessage() {
    $('#errorMessage').html('');
    $('#errorMessage').css('display', 'none');
}

/*----------------------------------------DISPLAY MANIPULATION-------------------------------------------------*/
/*This is the function called when the ajax request is successful.
This function is responsible for prepending a new post, or removing a post.*/
function refreshPosts(data, mode) {
    var removePostId = "removePost" + data.ID;
    if (mode == 'created') {
        if (data.errorMessage != '') {
            var dateCreated = dateFormat(new Date(data.DateCreated), "h:MM TT mmmm dd, yyyy");
            $('div .recentpost').removeClass('recentpost').addClass('post');
            var removePostId = "removePost" + data.ID;
            var recentpost = '<div class="recentpost">' +
                                        '<div class="blogContent">' + data.Content +
                                        '</div> <div class="datePosted">' + dateCreated +
                                        '</div>' +
                                        '<div class="removeContent">' +
                                            '<span id=' + '"' + removePostId + '"' + 'class="removePost">Remove</span>' +
                                        '</div> <div class="clear"></div>' +
                                        '<hr />' +
                                  '</div>'

            var firstPost = $('div .post').length;
            if (firstPost == 0) { $('#header').after(recentpost); }
            else { $('div .post').first().before(recentpost); }
            $('#blogContent').val('');
            clearErrorMessage();
            setformfieldsize($('#blogContent'), 200, 'remainingCharacters');
        }
        else {
            displayErrorMessage(data.errorMessage);
        }
    }
    else if (mode == 'removed') {
        if (data.errorMessage != '') {
            removePostId = "#" + removePostId;
            var parentDiv = $(removePostId).parent().parent();
            if (parentDiv.attr('class') == "recentpost") {
                $('div .post').first().removeClass('post').addClass('recentpost');
            }
            $(removePostId).parent('div').parent('div').remove();
            parentDiv.remove();
            clearErrorMessage();
        }
        else { displayErrorMessage(data.errorMessage); }
    }
};

/*This is the function called when the ajax request fails (such as timeout). Right now, the implementation
is just to clear and reset the textarea.*/
function showError(req, status, error) {
    if (status == 'error') {
        displayErrorMessage('An unexpected error occured. Please try again later.');
        $('#blogContent').val('');
        setformfieldsize($('#blogContent'), 200, 'remainingCharacters');
    }
};

/*--------------------------------------CONTENT INITIALIZATION-------------------------------------------------*/
/*This function sets the most current post to have the class "recentPost".
This also decode data returned by the database to be properly displayed in the page*/
function initializeContents() {
    $('div .post').first().removeClass('post').addClass('recentpost');
    $('div .blogContent').each(function () {
        var encodedMessage = Encoder.htmlDecode($(this).text());
        $(this).text(encodedMessage);
    });
}

/*Function to remove leading and trailing white space*/
function removeWhiteSpace(data) {
    return data.replace(/^\s*|\s*$/g, '');
}

/*This binds the click event to the "Add Entry" button and the "Remove" link. */
function initializeActionCalls() {
    $('#createPost').click(function () {
        var message = removeWhiteSpace(Encoder.htmlEncode($('#blogContent').val()));
        if (message != '') {
            var newPost = {
                blogContent: message
            };
            ajaxPost(createPostUrl, newPost, 100000, refreshPosts, showError, 'created');
        }
        else {
            displayErrorMessage("Please enter your message.");
        }
    });

    $('.removePost').live("click", function () {
        var post = {
            Id: parseInt($(this).attr('id').substring(10))
        };
        ajaxPost(deletePostUrl, post, 100000, refreshPosts, showError, 'removed');
    });
}




