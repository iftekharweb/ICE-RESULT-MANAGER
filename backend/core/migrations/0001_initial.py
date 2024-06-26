# Generated by Django 5.0.6 on 2024-06-04 03:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('name', models.CharField(choices=[('System Admin', 'System Admin'), ('Teacher', 'Teacher'), ('Student', 'Student'), ('Unassigned', 'Unassigned')], max_length=255, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('role', models.ForeignKey(blank=True, default='Unassigned', on_delete=django.db.models.deletion.CASCADE, to='core.role')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
