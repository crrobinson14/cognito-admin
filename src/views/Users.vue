<template>
<v-col class="text-center align-self-start">
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="users" :items-per-page="1" class="elevation-1" :search="search" :loading="loading"
                  :footer-props="{ showFirstLastPage: true, itemsPerPageOptions: [1,5,25,-1] }">
      <template v-slot:item.Email="{ item }">
      <v-icon v-if="item.Attributes.find(({ Name }) => Name === 'email_verified').Value === 'true'" color="green">mdi-check-circle</v-icon>
      <v-icon v-if="item.Attributes.find(({ Name }) => Name === 'email_verified').Value !== 'true'" color="grey">minus-circle</v-icon>
      {{ item.Attributes.find(({ Name }) => Name === 'email').Value }}
      </template>
      <template v-slot:item.Phone="{ item }">
      <v-icon v-if="item.Attributes.find(({ Name }) => Name === 'phone_number_verified').Value === 'true'" color="green">mdi-check-circle</v-icon>
      <v-icon v-if="item.Attributes.find(({ Name }) => Name === 'phone_number_verified').Value !== 'true'" color="grey">minus-circle</v-icon>
      {{ item.Attributes.find(({ Name }) => Name === 'phone_number').Value }}
      </template>
      <template v-slot:item.UserCreateDate="{ value }">
      {{ value | formatCreated }}
      </template>
      <template v-slot:item.UserStatus="{ item }">
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'UNCONFIRMED'" color="amber" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'CONFIRMED'" color="amber" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'ARCHIVED'" color="amber" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'COMPROMISED'" color="red" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'UNKNOWN'" color="red" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'RESET_REQUIRED'" color="red" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
        <v-icon v-if="item.UserStatus === 'FORCE_CHANGE_PASSWORD'" color="amber" v-on="on">mdi-key-change</v-icon>
        </template>
        <span>Force Change Password</span>
      </v-tooltip>
      </template>
      <template v-slot:item.Attributes="{ item, value }">
      {{ filterAttributes(item.Attributes) }}
      </template>
    </v-data-table>

  </v-card>
</v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import Component from 'vue-class-component';
import config from "../../config.json";
import { CognitoIdentityServiceProvider } from 'aws-sdk';

// TODO: Use the username-source setting to determine whether to show the Username column or not

@Component({
	props: {
		source: String,
	},
	filters: {
		formatCreated: function(value: any) {
			if (!value) return '';
			return moment(value).format('MM/DD/YYYY hh:mm a');
		}
	}
})
export default class Users extends Vue {
	loading = true;
	users: Array<CognitoIdentityServiceProvider.UserType | undefined> = [];
	search = '';
	skipAttributes = ['email', 'phone_number', 'email_verified', 'phone_number_verified'];
	headers = [
		{
			text: 'Email',
			align: 'left',
			sortable: true,
			value: 'Email',
		},
		{
			text: 'Phone',
			align: 'left',
			sortable: true,
			value: 'Phone',
		},
		{ text: 'Enabled', value: 'Enabled', filterable: false },
		{ text: 'Status', value: 'UserStatus', filterable: false },
		{ text: 'Created', value: 'UserCreateDate', filterable: false },
		{ text: 'Attributes', value: 'Attributes' },
	];

	mounted(): void {
		const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({
			region: config.region,
			accessKeyId: config.accessKeyId,
			secretAccessKey: config.secretAccessKey,
		});

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
		cognitoidentityserviceprovider.listUsers(params, (err, data) => {
			if (err) console.log(err, err.stack); // an error occurred
			else console.log(data);           // successful response
			this.users = data.Users || [];
			this.loading = false;
		});
	}

	filterAttributes(attributes: CognitoIdentityServiceProvider.AttributeListType) {
		return attributes
			.filter(({ Name }) => !this.skipAttributes.includes(Name))
			.map(({ Name, Value }) => `${Name}=${Value}`).join(', ');
	}
}
</script>
