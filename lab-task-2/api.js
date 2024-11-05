let activities = [
    { id: 1, activity: "Playing Basketball", type: "Sports" },
];

$(document).ready(function () {
    initActivities();
    $(document).on("click", ".btn-del", deleteItem);
    $(document).on("click", ".btn-edit", editItem);
    $("#activityForm").submit(submitForm);
    $("#clearBtn").on("click", clearForm);
});

function initActivities() {
    addRandomActivity();
    renderList();
}

function addRandomActivity() {
    $.ajax({
        url: "https://www.boredapi.com/api/activity/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            const newActivity = {
                id: Date.now(),
                activity: data.activity,
                type: data.type
            };
            activities.push(newActivity);
            renderList();
        },
        error: function (error) {
            console.error("Error fetching activity:", error);
        }
    });
}

function renderList() {
    const activitiesList = $("#activitiesList");
    activitiesList.empty();

    activities.forEach(activity => {
        activitiesList.append(`
            <div class="mb-3">
                <h4>${activity.activity}</h4>
                <p>Type: ${activity.type}</p>
                <div>
                    <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${activity.id}">Edit</button>
                    <button class="btn btn-danger btn-sm btn-del" data-id="${activity.id}">Delete</button>
                </div>
            </div>
            <hr />
        `);
    });
}

function submitForm(event) {
    event.preventDefault();
    const activityId = $("#submitBtn").attr("data-id");
    const activityTitle = $("#activityTitle").val();
    const activityType = $("#activityType").val();

    if (activityId) {
        activities = activities.map(activity =>
            activity.id == activityId ? { ...activity, activity: activityTitle, type: activityType } : activity
        );
    } else {
        const newActivity = { id: Date.now(), activity: activityTitle, type: activityType };
        activities.push(newActivity);
    }

    clearForm();
    renderList();
}

function deleteItem() {
    const activityId = $(this).attr("data-id");
    activities = activities.filter(activity => activity.id != activityId);
    renderList();
}

function editItem() {
    const activityId = $(this).attr("data-id");
    const activity = activities.find(activity => activity.id == activityId);

    if (activity) {
        $("#activityTitle").val(activity.activity);
        $("#activityType").val(activity.type);
        $("#submitBtn").text("Update").attr("data-id", activity.id);
        $("#clearBtn").show();
    }
}

function clearForm() {
    $("#activityTitle").val("");
    $("#activityType").val("");
    $("#submitBtn").text("Add Activity").removeAttr("data-id");
    $("#clearBtn").hide();
}
