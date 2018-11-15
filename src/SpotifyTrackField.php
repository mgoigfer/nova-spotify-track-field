<?php

namespace Mgoigfer\SpotifyTrackField;

use Illuminate\Support\Facades\DB;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;

class SpotifyTrackField extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'nova-spotify-track-field';

    /**
     * Set the Spotify access token.
     *
     * @return $this
     */
    public function spotifyAccessToken()
    {
        $spotify = app()->make('SpotifyWrapper');

        $refresh_token = DB::table('spotify')
            ->where('key', 'refresh_token')->first()->value;
        $access_token = $spotify->refreshAccessToken($refresh_token);

        return $this->withMeta([
            'spotifyAccessToken' => $access_token,
        ]);
    }

    /**
     * Hydrate the given attributes on the model based on the incoming request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  string  $requestAttribute
     * @param  object  $model
     * @param  string  $attribute
     * @return void
     */
    protected function fillAttributeFromRequest(NovaRequest $request,
        $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $model->{$attribute} = $request[$requestAttribute];
        }

        if ($request->exists('spotify_id')) {
            $model->spotify_id = $request['spotify_id'];
            $model->artist = $request['artist'];
            $model->duration_ms = $request['duration_ms'];
            $model->popularity = $request['popularity'];
            $model->preview_url = $request['preview_url'];
            $model->first_letter = $request['first_letter'];
        }
    }
}
