<template>
<v-app id="inspire">
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login to AWS Cognito</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="User Pool ID" name="poolId" prepend-icon="contacts" type="text" autocomplete="off" v-model="userPoolId"/>
                <v-text-field label="Login" name="login" prepend-icon="person" type="text" autocomplete="username"/>
                <v-text-field label="Password" name="password" prepend-icon="lock" type="password" id="password" autocomplete="current-password"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</v-app>
</template>

<script lang="ts">
import config from "../../config.json";
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default {
	props: {
		source: String,
	},
	data() {
		return {
			userPoolId: config.userPoolId,
			email: '',
			password: '',
		};
	},
	mounted(): void {
		const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
			region: config.region,
			accessKeyId: config.accessKeyId,
			secretAccessKey: config.secretAccessKey,
		});
		console.log('sp', cognitoidentityserviceprovider);

		const params = {
			UserPoolId: config.userPoolId,
			// AttributesToGet: [
			// 	'STRING_VALUE',
			/* more items */
			// ],
			// Filter: 'STRING_VALUE',
			// Limit: 'NUMBER_VALUE',
			// PaginationToken: 'STRING_VALUE'
		};
		cognitoidentityserviceprovider.listUsers(params, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else console.log(data);           // successful response
		});
	}
}
</script>
