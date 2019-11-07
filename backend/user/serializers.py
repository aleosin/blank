from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer

class UserSerializer(UserDetailsSerializer):

    avatar = serializers.ImageField(source='profile.avatar')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('avatar',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        avatar = profile_data.get('avatar')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile with avatar
        profile = instance.profile
        if profile_data and avatar:
            profile.avatar = avatar
            profile.save()
            
        return instance