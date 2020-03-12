{
    // Method to submit the form data for new post using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');     //Form's id
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: 'posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost=newPostDom(data.data.post)  // call Dom function from here
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));  // Delete a post by ajax
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

// method to create a post in DOM
let newPostDom=function(post){
    return $(`<li id="post-${ post._id }">
    <p>

            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id}">Delete</a>
            </small>

            ${post.content }
        <br>
        <small>
        ${ post.user.name }
        </small>
    </p>

    <div class="post-comments">
    
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to Add Comment...">
                <input type="hidden" name="post" value="${post._id }">
                <input type="submit" value="Add Comment">
            </form>
        

        <div class="post-comments-list">
            <ul id="post-comment-${ post._id }">

            </ul>
        </div>

    </div>

</li>`)
}

// Method to delete a post from DOM
let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'), // To get the value of href in a tag
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },error: function(error){

            }
        });
    });
}

    createPost();
}
