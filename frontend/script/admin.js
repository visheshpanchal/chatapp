let addFriends = document.getElementById("admin-add-friend");

let removeFriends = document.getElementById("admin-remove-friend");

window.addEventListener("DOMContentLoaded", loadFriends);

async function loadFriends() {
  let id = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "get",
      url: api + "group/friends/list?id=" + id,
    });

    let friends =
      res.data.data.notFriends != undefined ? res.data.data.notFriends : [];

    let notFriends =
      res.data.data.friends != undefined ? res.data.data.friends : [];

    // Add Friends
    let addFriendsBody = "";
    for (const friend of friends) {
      let tr = ` <tr>
        <td>${friend.name}</td>
        <td><button class="btn btn-primary" value="${friend.id}" onclick="addUser(this)">Add</button></td>
      </tr>`;

      addFriendsBody += tr;
    }
    let addFriendsStructure = `
                        <thead>
                        <th>Friend</th>
                        <th>Add</th>
                    </thead>
                    <tbody>
                        ${addFriendsBody}
                    </tbody>`;

    addFriends.innerHTML = addFriendsStructure;

    // Remove Friend Body

    let removeFriendsBody = "";
    for (const friend of notFriends) {
      let tr = ` <tr>
        <td>${friend.name}</td>
        <td><button class="btn btn-danger" value="${friend.id}" onclick="removeUser(this)">Remove</button></td>
      </tr>`;

      removeFriendsBody += tr;
    }
    let removeFriendsStructure = `
                        <thead>
                        <th>Friend</th>
                        <th>Remove</th>
                    </thead>
                    <tbody>
                        ${removeFriendsBody}
                    </tbody>`;

    removeFriends.innerHTML = removeFriendsStructure;
  } catch (err) {
    console.log(err);
  }
}

async function removeUser(event) {
  let id = event.value;
  let gId = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "delete",
      url: api + "group/friends/remove",
      data: { groupId: gId, userId: id },
    });

    if (res) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function addUser(event) {
  let id = event.value;
  let gId = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "post",
      url: api + "group/friends/add",
      data: { groupId: gId, userId: id },
    });

    if (res) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}
