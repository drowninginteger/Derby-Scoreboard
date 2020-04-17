<!DOCTYPE html>
<html>
<head>
	<title>Derby Scoreboard</title>

	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" type="text/javascript"></script>
</head>

<?php
	$is_admin = (isset($_GET['admin']) && $_GET['admin'] == '1');
?>

<body class="<?php echo ($is_admin ? 'admin' : ''); ?>">

	<div id="app">

		<div id="team-1">
			<h3>Team One</h3>

			<?php if ($is_admin){ ?>
				<button v-on:click="updateTeamScore" data-team="1" data-change="-5">- 5</button>
				<button v-on:click="updateTeamScore" data-team="1" data-change="-1">- 1</button>
			<?php } ?>

			<input type="text" name="team_1_score" v-bind:value="team_1_score" />

			<?php if ($is_admin){ ?>
				<button v-on:click="updateTeamScore" data-team="1" data-change="1">+ 1</button>
				<button v-on:click="updateTeamScore" data-team="1" data-change="5">+ 5</button>
			<?php } ?>
		</div>

		<div id="team-2">
			<h3>Team Two</h3>

			<?php if ($is_admin){ ?>
				<button v-on:click="updateTeamScore" data-team="2" data-change="-5">- 5</button>
				<button v-on:click="updateTeamScore" data-team="2" data-change="-1">- 1</button>
			<?php } ?>

			<input type="text" name="team_2_score" v-bind:value="team_2_score" />

			<?php if ($is_admin){ ?>
				<button v-on:click="updateTeamScore" data-team="2" data-change="1">+ 1</button>
				<button v-on:click="updateTeamScore" data-team="2" data-change="5">+ 5</button>
			<?php } ?>
		</div>

	</div>

	<script src="main.js" type="text/javascript"></script>

</body>
</html>