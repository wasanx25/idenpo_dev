# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


# delete post
$ ->
  $('a[data-method="delete"]').on 'ajax:success', (xhr, data, status) ->
    $('#post_' + data.post.id).fadeOut()
    return
  return

# create post
$ ->
  $('.update_form').on 'ajax:success', (xhr, data, status) ->
    $('#update_notice').fadeIn()
    setTimeout (->
      $('#update_notice').fadeOut()
      return
    ), 2000
    return
  return

# update post
